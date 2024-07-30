// src/components/orders/OrdersTable.jsx
import PropTypes from 'prop-types';
import React from 'react';
import OrderItem from './OrdersItems';

const OrdersTable = ({ filteredOrders }) => (
  <div>
    {filteredOrders.length > 0 && (
      <div className="grid grid-order grid-count-6">
        <div className="grid-col">
          <h5>Customer Name</h5>
        </div>
        <div className="grid-col">
          <h5>Items</h5>
        </div>
        <div className="grid-col">
          <h5>Address</h5>
        </div>
        <div className="grid-col">
          <h5>Phone Number</h5>
        </div>
      </div>
    )}
    {filteredOrders.length === 0
      ? new Array(10).fill({}).map((order, index) => (
          <OrderItem key={`order-skeleton-${index}`} order={order} />
        ))
      : filteredOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
  </div>
);

OrdersTable.propTypes = {
  filteredOrders: PropTypes.array.isRequired,
};

export default OrdersTable;
