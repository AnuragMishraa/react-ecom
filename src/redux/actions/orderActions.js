import {
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  EDIT_ORDER,
  EDIT_ORDER_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  REMOVE_ORDER,
  REMOVE_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  SET_LOADING,
  SET_REQUEST_STATUS
} from '@/constants/constants';

export const getOrders = () => ({
  type: GET_ORDERS
});

export const getOrdersSuccess = (orders) => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders
});

export const getOrdersFailure = (error) => ({
  type: GET_ORDERS_FAILURE,
  payload: error
});

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order
});

export const addOrderSuccess = (order) => ({
  type: ADD_ORDER_SUCCESS,
  payload: order
});

export const editOrder = (id, updates) => ({
  type: EDIT_ORDER,
  payload: { id, updates }
});

export const editOrderSuccess = (order) => ({
  type: EDIT_ORDER_SUCCESS,
  payload: order
});

export const removeOrder = (id) => ({
  type: REMOVE_ORDER,
  payload: id
});

export const removeOrderSuccess = (id) => ({
  type: REMOVE_ORDER_SUCCESS,
  payload: id
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setRequestStatus = (status) => ({
  type: SET_REQUEST_STATUS,
  payload: status
});
