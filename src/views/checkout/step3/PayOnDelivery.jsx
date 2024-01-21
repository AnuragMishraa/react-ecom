/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormikContext } from 'formik';
import React from 'react';

const PayOnDelivery = () => {
  const { values, setValues } = useFormikContext();

  return (
    <div className={`checkout-fieldset-collapse ${values.type === 'payondel' ? 'is-selected-payment' : ''}`}>
      <div className="checkout-field margin-0">
        <div className="checkout-checkbox-field">
          <input
            //checked={values.type === 'paypal'}
            checked={true}
            id="modePayOnDel"
            name="type"
            onChange={(e) => {
              if (e.target.checked) {
                setValues({ ...values, type: 'payondel' });
              }
            }}
            type="radio"
          />
          <label
            className="d-flex w-100"
            htmlFor="modePayOnDel"
          >
            <div className="d-flex-grow-1 margin-left-s">
              <h4 className="margin-0">Pay On Delivery</h4>
              <span className="text-subtle d-block margin-top-s">
                Pay Cash, Card or UPI when order is delivered.
              </span>
            </div>
            <div className="payment-img payment-img-paypal" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PayOnDelivery;
