import authReducer from './authReducer';
import basketReducer from './basketReducer';
import checkoutReducer from './checkoutReducer';
import filterReducer from './filterReducer';
import miscReducer from './miscReducer';
import productReducer from './productReducer';
import profileReducer from './profileReducer';
import userReducer from './userReducer';
import orderReducer from './orderReducer';

const rootReducer = {
  products: productReducer,
  basket: basketReducer,
  auth: authReducer,
  profile: profileReducer,
  filter: filterReducer,
  users: userReducer,
  checkout: checkoutReducer,
  app: miscReducer,
  orders: orderReducer
};

export default rootReducer;
