import {
  ADD_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  GET_ORDERS_SUCCESS,
  REMOVE_ORDER_SUCCESS
} from '@/constants/constants';

const initState = {
  lastRefKey: null,
  total: 0,
  items: []
};

export default (state = {
  lastRefKey: null,
  total: 0,
  items: [],
}, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.orders]
      };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case REMOVE_ORDER_SUCCESS:
      return {
        ...state,
        items: state.items.filter((order) => order.id !== action.payload)
      };
    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        items: state.items.map((order) => {
          if (order.id === action.payload.id) {
            return {
              ...order,
              ...action.payload.updates
            };
          }
          return order;
        })
      };
    default:
      return state;
  }
};
