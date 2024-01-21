import {
  GET_ORDERS,
  SEARCH_ORDER,
  SEARCH_ORDER_SUCCESS,
  GET_ORDERS_SUCCESS,
  REMOVE_ORDER,
  REMOVE_ORDER_SUCCESS,
} from "@/constants/constants";

const initState = {
  lastRefKey: null,
  total: 0,
  items: [],
  searchedOrders: {
    lastRefKey: null,
    total: 0,
    items: [],
  },
};

const orderReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.orders],
      };
    case SEARCH_ORDER_SUCCESS:
      return {
        ...state,
        searchedOrders: {
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [...state.searchedOrders.items, ...action.payload.orders],
        },
      };
    case GET_ORDERS:
    case SEARCH_ORDER:
    case REMOVE_ORDER:
    case REMOVE_ORDER_SUCCESS:
      // You can handle these actions if needed
      return state;
    default:
      return state;
  }
};

export default orderReducer;
