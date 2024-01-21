import React from 'react';
import {
  Link, NavLink, useLocation
} from 'react-router-dom';
import * as ROUTE from '@/constants/routes';
import { FontSizeOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons';

const BottomNavigation = () => {
  const navigationItems = [
    { icon: 'home', link: '/', title: 'Home' },
    { icon: 'search', link: '/search', title: 'Search' },
    { icon: 'user', link: '/profile', title: 'Profile' },
  ];

  return (
    <div className="bottom-navigation">
      <ul className="bottom-navigation-menu">
        {/* {navigationItems.map((item) => (
          <li key={item.title} className="bottom-navigation-item">
            <Link to={item.link} className="bottom-navigation-link">
              <div className="bottom-navigation-icon">
                <i className={`fa fa-${item.icon}`} />
              </div>
              <span className="bottom-navigation-title">{item.title}</span>
            </Link>
          </li>
        ))} */}
        <li><NavLink activeClassName="bottom-navigation-item" exact to={ROUTE.HOME}><HomeOutlined style={{fontSize: '25px'}}/></NavLink></li>
        <li><NavLink activeClassName="bottom-navigation-item" to={ROUTE.SHOP}><ShopOutlined style={{fontSize: '25px'}}/></NavLink></li>
        <li><NavLink activeClassName="bottom-navigation-item" to={ROUTE.FEATURED_PRODUCTS}>Featured</NavLink></li>
        <li><NavLink activeClassName="bottom-navigation-item" to={ROUTE.RECOMMENDED_PRODUCTS}>Recommended</NavLink></li>
      </ul>
    </div>
  );
};

export default BottomNavigation;
