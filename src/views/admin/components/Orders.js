// Orders.js
import React, { useEffect, useState } from "react";
import { database } from "./firebase";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = database.ref("orders");

    ordersRef.on("value", (snapshot) => {
      const ordersData = snapshot.val();
      if (ordersData) {
        const ordersArray = Object.values(ordersData);
        setOrders(ordersArray);
      }
    });

    return () => {
      // Cleanup the event listener when the component unmounts
      ordersRef.off("value");
    };
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{/* Render order details here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
