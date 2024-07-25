import { BasketToggle } from '@/components/basket';
import { HOME, SIGNIN } from '@/constants/routes';
import PropType from 'prop-types';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import * as ROUTE from '@/constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined, FilterOutlined, ShoppingOutlined, BookTwoTone } from "@ant-design/icons";
import UserNav from '@/views/account/components/UserAvatar';
import Badge from './Badge';
import FiltersToggle from './FiltersToggle';
import SearchBar from './SearchBar';
import logo from '../../images/logo-full.png';
import BottomNavigation from './BottomNavigation';

const Navigation = (props) => {
  const {
    isAuthenticating, basketLength, disabledPaths, user
  } = props;
  const { pathname } = useLocation();

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  return (
    <nav className="mobile-navigation">
      <div className="mobile-navigation-main">
        <div className="mobile-navigation-logo">
          <Link onClick={onClickLink} to={HOME}>
            <img src={logo} style={{width: '100px' ,paddingTop: '10px'}}></img>
          </Link>
        </div>

        <BasketToggle>
              {({ onClickToggle }) => (
                <button
                  className="button-link navigation-menu-link basket-toggle"
                  disabled={disabledPaths.includes(pathname)}
                  onClick={onClickToggle}
                  type="button"
                >

                  <Badge count={basketLength}>
                    <ShoppingOutlined style={{ fontSize: '2.4rem' }} />
                  </Badge>
                </button>
              )}
            </BasketToggle>
        
        {/* <ul className="mobile-navigation-menu"> */}
          {user ? (
            <li className="mobile-navigation-item">
              <UserNav />
            </li>
          ) : (
            <>
              <li className="navigation-action">
              {pathname !== ROUTE.SIGNUP && (
                <Link
                  className="button button-small"
                  onClick={onClickLink}
                  to={ROUTE.SIGNUP}
                >
                  Sign Up
                </Link>
              )}
              {pathname !== ROUTE.SIGNIN && (
                <Link
                  className="button button-small button-muted margin-left-s"
                  onClick={onClickLink}
                  to={ROUTE.SIGNIN}
                >
                  Sign In
                </Link>
              )}
            </li>
            </>
          )}
        {/* </ul> */}
      </div>
      <div className="mobile-navigation-sec">
        <div className="mobile-navigation-search">
            <SearchBar placeholder={'Search Sethji...'}/>
        </div>
        <FiltersToggle>
            <button className="button-muted button-small" type="button">
              &nbsp;
              <FilterOutlined />
            </button>
        </FiltersToggle>
      </div>
      <BottomNavigation/>
    </nav>
  );
};

Navigation.propTypes = {
  isAuthenticating: PropType.bool.isRequired,
  basketLength: PropType.number.isRequired,
  disabledPaths: PropType.arrayOf(PropType.string).isRequired,
  user: PropType.oneOfType([
    PropType.bool,
    PropType.object
  ]).isRequired
};

export default Navigation;
