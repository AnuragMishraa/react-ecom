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
        <li><NavLink exact activeClassName="active" to={ROUTE.HOME} style={{fontSize: '13px'}}><HomeOutlined style={{fontSize: '26px'}}/>Home</NavLink></li>
        <li><NavLink activeClassName="active" to={ROUTE.SHOP} style={{fontSize: '13px'}}><ShoppingOutlined style={{fontSize: '26px'}}/>Shop</NavLink></li>
        <li>
          <BasketToggle>
            {({ onClickToggle }) => (
              <button
                className="button-link navigation-menu-link basket-toggle"
                disabled={disabledPaths.includes(pathname)}
                onClick={onClickToggle}
                type="button"
              >
                <Badge count={basketLength}>
                  <ShoppingCartOutlined style={{ fontSize: "35px", color: '#FF8C00' }} />
                  <span style={{ fontSize: "12px", color: '#FF8C00' }}>Cart</span>
                </Badge>
              </button>
            )}
          </BasketToggle>
        </li>
        <li><NavLink activeClassName="active" to={ROUTE.FEATURED_PRODUCTS} style={{fontSize: '13px'}}><ThunderboltOutlined style={{fontSize: '26px'}}/>Feat</NavLink></li>
        <li><NavLink activeClassName="active" to={ROUTE.RECOMMENDED_PRODUCTS} style={{fontSize: '13px'}}><CheckCircleOutlined style={{fontSize: '26px'}}/>Assured</NavLink></li>
      </ul>
    </div>
  );
};

export default BottomNavigation;
