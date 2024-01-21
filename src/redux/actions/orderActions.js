import {
  GET_ORDERS,
  SEARCH_ORDER,
  SEARCH_ORDER_SUCCESS,
  GET_ORDERS_SUCCESS,
  REMOVE_ORDER,
  REMOVE_ORDER_SUCCESS,
} from "@/constants/constants";

export const getOrder = (lastRef) => ({
  type: GET_ORDERS,
  payload: lastRef
});

export const getOrderSuccess = (orders) => ({

});