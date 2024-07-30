// src/views/admin/orders/index.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrdersNavbar from '../components/OrderNavbar';
import OrdersTable from '../components/OrdersTable';
import OrderDetailsPanel from '../components/OrdersDetailsPanel';
import { getOrders } from '@/redux/actions/orderActions';

const Orders = () => {
  const dispatch = useDispatch();
  const { items: orders, total, loading } = useSelector((state) => state.orders);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setSelectedProduct(null);
    setIsPanelOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <OrdersNavbar ordersCount={filteredOrders.length} totalOrdersCount={total} />
      <OrdersTable filteredOrders={filteredOrders} onProductClick={handleProductClick} />
      <OrderDetailsPanel product={selectedProduct} isOpen={isPanelOpen} onClose={handleClosePanel} />
    </div>
  );
};

export default Orders;
