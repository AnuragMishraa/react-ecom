import { all, takeLatest } from 'redux-saga/effects';
import * as ACTION from '@/constants/constants';
import authSaga from './authSaga';
import productSaga from './productSaga';
import profileSaga from './profileSaga';
import orderSaga from './orderSaga';

function* rootSaga() {
  yield all([
    takeLatest([
      ACTION.SIGNIN,
      ACTION.SIGNUP,
      ACTION.SIGNOUT,
      ACTION.SIGNIN_WITH_GOOGLE,
      ACTION.SIGNIN_WITH_FACEBOOK,
      ACTION.SIGNIN_WITH_GITHUB,
      ACTION.ON_AUTHSTATE_CHANGED,
      ACTION.ON_AUTHSTATE_SUCCESS,
      ACTION.ON_AUTHSTATE_FAIL,
      ACTION.SET_AUTH_PERSISTENCE,
      ACTION.RESET_PASSWORD
    ], authSaga),
    takeLatest([
      ACTION.ADD_PRODUCT,
      ACTION.SEARCH_PRODUCT,
      ACTION.REMOVE_PRODUCT,
      ACTION.EDIT_PRODUCT,
      ACTION.GET_PRODUCTS
    ], productSaga),
    takeLatest([
      ACTION.UPDATE_EMAIL,
      ACTION.UPDATE_PROFILE
    ], profileSaga),
    orderSaga(), // Include orderSaga
  ]);
}

export default rootSaga;
