import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '@/redux/actions/orderActions';

const OrdersComponent = () => {
  const dispatch = useDispatch();
  const { items: orders, loading, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Address: {order.address}</p>
            <p>Order Notes: {order.orderNotes}</p>
            <div>Products:</div>
            <ul>
              {order.products.map(product => (
                <li key={product.productId}>
                  {product.productName} - {product.productPrice}
                </li>
              ))}
            </ul>
            <div>Search Tags: {order.search_tags ? order.search_tags.join(', ') : 'No tags available'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersComponent;
