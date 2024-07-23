import {
    ADD_ORDER,
    EDIT_ORDER,
    GET_ORDERS,
    REMOVE_ORDER
  } from '@/constants/constants';
  import { ADMIN_ORDERS } from '@/constants/routes';
  import { displayActionMessage } from '@/helpers/utils';
  import {
    all, call, put, select, takeLatest
  } from 'redux-saga/effects';
  import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
  import { history } from '@/routers/AppRouter';
  import firebase from '@/services/firebase';
  import {
    addOrderSuccess,
    editOrderSuccess,
    getOrdersSuccess,
    removeOrderSuccess
  } from '../actions/orderActions';
  
  function* initRequest() {
    yield put(setLoading(true));
    yield put(setRequestStatus(null));
  }
  
  function* handleError(e) {
    yield put(setLoading(false));
    yield put(setRequestStatus(e?.message || 'Failed to fetch orders'));
    console.log('ERROR: ', e);
  }
  
  function* handleAction(location, message, status) {
    if (location) yield call(history.push, location);
    yield call(displayActionMessage, message, status);
  }
  
  function* fetchOrders() {
    try {
      yield initRequest();
      const state = yield select();
      const result = yield call(firebase.getOrders);
  
      if (!result.orders || result.orders.length === 0) {
        yield handleError('No items found.');
      } else {
        yield put(getOrdersSuccess({
          orders: result.orders,
          lastKey: result.lastKey ? result.lastKey : state.orders.lastRefKey,
          total: result.total ? result.total : state.orders.total
        }));
        yield put(setRequestStatus(''));
      }
      yield put(setLoading(false));
    } catch (e) {
      console.log(e);
      yield handleError(e);
    }
  }
  
  function* addOrder({ payload }) {
    try {
      yield initRequest();
      const key = yield call(firebase.generateKey);
      const order = {
        ...payload,
        id: key,
      };
  
      yield call(firebase.addOrder, key, order);
      yield put(addOrderSuccess(order));
      yield handleAction(ADMIN_ORDERS, 'Order successfully added', 'success');
      yield put(setLoading(false));
    } catch (e) {
      yield handleError(e);
      yield handleAction(undefined, `Order failed to add: ${e?.message}`, 'error');
    }
  }
  
  function* editOrder({ payload }) {
    try {
      yield initRequest();
      yield call(firebase.editOrder, payload.id, payload.updates);
      yield put(editOrderSuccess({
        id: payload.id,
        updates: payload.updates
      }));
      yield handleAction(ADMIN_ORDERS, 'Order successfully edited', 'success');
      yield put(setLoading(false));
    } catch (e) {
      yield handleError(e);
      yield handleAction(undefined, `Order failed to edit: ${e.message}`, 'error');
    }
  }
  
  function* removeOrder({ payload }) {
    try {
      yield initRequest();
      yield call(firebase.removeOrder, payload);
      yield put(removeOrderSuccess(payload));
      yield put(setLoading(false));
      yield handleAction(ADMIN_ORDERS, 'Order successfully removed', 'success');
    } catch (e) {
      yield handleError(e);
      yield handleAction(undefined, `Order failed to remove: ${e.message}`, 'error');
    }
  }
  
  function* orderSaga() {
    yield takeLatest(GET_ORDERS, fetchOrders);
    yield takeLatest(ADD_ORDER, addOrder);
    yield takeLatest(EDIT_ORDER, editOrder);
    yield takeLatest(REMOVE_ORDER, removeOrder);
  }
  
  export default orderSaga;
  