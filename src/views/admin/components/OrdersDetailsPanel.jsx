// src/components/orders/OrderDetailsPanel.jsx
import React from 'react';
import PropTypes from 'prop-types';

const OrderDetailsPanel = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <SidePanel isOpen={isOpen} onClose={onClose}>
      <img src={product.productImage} alt={product.productName} className="side-panel-image" />
      <h4>{product.productName}</h4>
      <p>Price: ₹{product.productPrice}</p>
    </SidePanel>
  );
};

OrderDetailsPanel.propTypes = {
  product: PropTypes.shape({
    productImage: PropTypes.string,
    productName: PropTypes.string,
    productPrice: PropTypes.number,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailsPanel;
