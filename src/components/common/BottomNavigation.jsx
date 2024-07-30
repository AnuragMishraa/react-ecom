import React from 'react';
import {
  NavLink
} from 'react-router-dom';
import * as ROUTE from '@/constants/routes';
import { HomeOutlined, ShoppingOutlined, ShoppingCartOutlined, ThunderboltOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { BasketToggle } from "@/components/basket";
import Badge from "./Badge";

const BottomNavigation = (props) => {
  const { basketLength, disabledPaths } = props;
  const pathname = window.location.pathname;

  return (
    <div className="bottom-navigation">
      <ul className="bottom-navigation-menu">
        <li><NavLink exact activeClassName="active" to={ROUTE.HOME}><HomeOutlined style={{fontSize: '35px'}}/>Home</NavLink></li>
        <li><NavLink activeClassName="active" to={ROUTE.SHOP}><ShoppingOutlined style={{fontSize: '35px'}}/>Shop</NavLink></li>
        <li>
          <BasketToggle>
            {({ onClickToggle }) => (
              <button
                className="button-link navigation-menu-link basket-toggle"
                style={{ color: '#FF8C00'}}
                disabled={disabledPaths.includes(pathname)}
                onClick={onClickToggle}
                type="button"
              >
                <Badge count={basketLength}>
                  <ShoppingCartOutlined style={{ fontSize: "40px" }} />
                  Cart
                </Badge>
              </button>
            )}
          </BasketToggle>
        </li>
        <li><NavLink activeClassName="active" to={ROUTE.FEATURED_PRODUCTS}><ThunderboltOutlined style={{fontSize: '35px'}}/>Feat</NavLink></li>
        <li><NavLink activeClassName="active" to={ROUTE.RECOMMENDED_PRODUCTS}><CheckCircleOutlined style={{fontSize: '35px'}}/>Assured</NavLink></li>
      </ul>
    </div>
  );
};

export default BottomNavigation;
