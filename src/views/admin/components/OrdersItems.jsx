// src/components/orders/OrderItem.jsx
import { ImageLoader } from '@/components/common';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { removeOrder } from '@/redux/actions/orderActions';
import SidePanel from './SidePanel';
import OrderDetailsPanel from './OrdersDetailsPanel';

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const orderRef = useRef(null);
  const [showProductPanel, setShowProductPanel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const onDeleteOrder = () => {
    orderRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    dispatch(removeOrder(order.id));
    orderRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    orderRef.current.classList.remove('item-active');
  };

  const handleProductClick = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setShowProductPanel(true);
  };

  const handleRowClick = () => {
    setShowSidePanel(true);
  };

  const handleCloseProductPanel = () => {
    setShowProductPanel(false);
    setSelectedProduct(null);
  };

  const handleCloseSidePanel = () => {
    setShowSidePanel(false);
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`item item-orders ${!order.id && 'item-loading'}`}
        ref={orderRef}
        onClick={handleRowClick}
      >
        <div className="grid grid-count-6">
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{order.userName || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col product-images">
            {order.products ? (
              order.products.map((product) => (
                <ImageLoader
                  key={product.productId}
                  src={product.productImage}
                  alt={product.productName}
                  style={{ width: '50px', height: '50px', margin: '5px', cursor: 'pointer' }}
                  onClick={(e) => handleProductClick(product, e)}
                />
              ))
            ) : (
              <Skeleton width={50} height={30} />
            )}
          </div>
          <div className="grid-col">
            <span>{order.address || <Skeleton width={100} />}</span>
          </div>
          <div className="grid-col">
            <span>{order.userMobile || <Skeleton width={50} />}</span>
          </div>
        </div>
        {order.id && (
          <div className="item-action">
            <button
              className="button button-border button-small button-danger"
              onClick={onDeleteOrder}
              type="button"
            >
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this?</h5>
              <button
                className="button button-small button-border"
                onClick={onCancelDelete}
                type="button"
              >
                No
              </button>
              &nbsp;
              <button
                className="button button-small button-danger"
                onClick={onConfirmDelete}
                type="button"
              >
                Yes
              </button>
            </div>
          </div>
        )}
        <OrderDetailsPanel
          isOpen={showProductPanel}
          onClose={handleCloseProductPanel}
          product={selectedProduct}
        />
        <SidePanel isOpen={showSidePanel} onClose={handleCloseSidePanel}>
          {/* Place any additional order details you want to show in the side panel here */}
          <h4>Order Details</h4>
          <p><strong>Name:</strong> {order.userName}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Phone Number:</strong> {order.userMobile}</p>
          {/* Add more details as necessary */}
        </SidePanel>
      </div>
    </SkeletonTheme>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    userMobile: PropTypes.string,
    address: PropTypes.string,
    orderNotes: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string,
        productImage: PropTypes.string,
        productName: PropTypes.string,
        productPrice: PropTypes.number,
      })
    ),
    timestamps: PropTypes.shape({
      orderDate: PropTypes.shape({
        seconds: PropTypes.number,
      }),
      paymentDate: PropTypes.shape({
        seconds: PropTypes.number,
      }),
    }),
  }).isRequired,
};

export default OrderItem;
