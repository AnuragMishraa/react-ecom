import { HOME } from '@/constants/routes';
import CheckOutlined from '@ant-design/icons';
import { Form, Formik, useFormikContext } from 'formik';
import { displayActionMessage } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import { useSelector } from 'react-redux';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../../services/firebase';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import Preloader from '../../../components/common/Preloader';
//import CreditPayment from './CreditPayment';
import Total from './Total';
import PayOnDelivery from './PayOnDelivery';
import ThanksPage from './ThanksPage';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name should be at least 4 characters.')
    .required('Name is required'),
  cardnumber: Yup.string()
    .min(13, 'Card number should be 13-19 digits long')
    .max(19, 'Card number should only be 13-19 digits long')
    .required('Card number is required.'),
  expiry: Yup.date()
    .required('Credit card expiry is required.'),
  ccv: Yup.string()
    .min(3, 'CCV length should be 3-4 digit')
    .max(4, 'CCV length should only be 3-4 digit')
    .required('CCV is required.'),
  type: Yup.string().required('Please select paymend mode')
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle('Check Out Final Step | Sethji');
  useScrollTop();

  //const navigate = useNavigate(false);
  const history = useHistory();

  const { basket, user } = useSelector((state) => ({
    basket: state.basket,
    user: state.profile,
    shipping: state.checkout.shipping,
  }));

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'payondel'
  };
  const onConfirm = async () => {
    try {
      // if (!user || !user.id ) {
      //   console.error('Invalid user data:', user);
      //   return;
      // }

      if (!basket || basket.length === 0) {
        console.error('Invalid basket data:', basket);
        return;
      }

      const orderDetails = {
        userEmail: user.email,
        userName: user.fullname,
        userMobile: shipping.mobile.value,
        address: shipping.address,
        products: basket.map((basketItem) => ({
          productId: basketItem.id,
          productName: basketItem.name,
          productPrice: basketItem.price,
          productImage: basketItem.image,
          // ... (other product details)
        })),
        timestamps: {
          orderDate: new Date(),
          paymentDate: new Date(),
        },
        orderNotes: 'any order note',
        // ... (Other order details)
      };

      //console.log('Order Details:', orderDetails);

      const undefinedKeys = Object.keys(orderDetails).filter(
        (key) => orderDetails[key] === undefined
      );

      if (undefinedKeys.length > 0) {
        console.error('Undefined values in orderDetails:', undefinedKeys);
        return;
      }

      // Now, add the document to Firestore
      await firebase.saveOrder(orderDetails);

      ReactDOM.render(<ThanksPage />, document.getElementById('root'));
      // <Preloader/>
      history.push(HOME);
      // Display success message or redirect to home
      //alert('Order Confirmed! Check your orders section for more details.');

      
    } catch (error) {
      console.error('Error during order confirmation:', error.message);
      // Handle error and provide feedback to the user
    }
  };
  
  return (
    <div className="checkout">
      {console.log(user)}
      {/* {console.log(shipping)} */}
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        // validate={(form) => {
        //   if (form.type === 'payondel') {
        //     displayActionMessage("We don't accept payments untill it's delivered! :)", 'info');
        //   }
        // }}
        onSubmit={onConfirm}
      >
        {() => (
          <>
          <Form className="checkout-step-3">
            {/* <CreditPayment /> */}
            <PayOnDelivery/>
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
            <button
              className="button"
              disabled={false}
              onClick={onConfirm}
              type="button"
            >
              <CheckOutlined />
              &nbsp;
              Confirm
            </button>          
          </>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string
  }).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(Payment);
