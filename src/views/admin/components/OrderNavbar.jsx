// src/components/orders/OrdersNavbar.jsx
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from '@/components/common';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const OrdersNavbar = ({ ordersCount, totalOrdersCount }) => {
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Orders &nbsp;
        (
        {`${ordersCount} / ${totalOrdersCount}`}
        )
      </h3>
      <SearchBar />
      &nbsp;
      <FiltersToggle>
        <button className="button-muted button-small" type="button">
          <FilterOutlined />
          &nbsp;More Filters
        </button>
      </FiltersToggle>
    </div>
  );
};

OrdersNavbar.propTypes = {
  ordersCount: PropTypes.number.isRequired,
  totalOrdersCount: PropTypes.number.isRequired,
};

export default OrdersNavbar;
