import {
  ADD_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  GET_ORDERS_SUCCESS,
  REMOVE_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  SET_LOADING,
  SET_REQUEST_STATUS
} from '@/constants/constants';

const initialState = {
  items: [],
  lastRefKey: null,
  total: 0,
  loading: false,
  requestStatus: null,
  error: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        items: [...state.items, ...action.payload.orders],
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        loading: false,
        error: null
      };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
        error: null
      };
    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        items: state.items.map(order => 
          order.id === action.payload.id ? { ...order, ...action.payload.updates } : order
        ),
        loading: false,
        error: null
      };
    case REMOVE_ORDER_SUCCESS:
      return {
        ...state,
        items: state.items.filter(order => order.id !== action.payload),
        loading: false,
        error: null
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_REQUEST_STATUS:
      return {
        ...state,
        requestStatus: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer;
