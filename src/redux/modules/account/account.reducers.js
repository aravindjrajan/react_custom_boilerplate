import {
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_LOADING,
  ACCOUNT_LOGIN_ERROR,
  ACCOUNT_LOGOUT_SUCCESS,
  ACCOUNT_LOGOUT_LOADING,
  ACCOUNT_LOGOUT_ERROR,
  ACCOUNT_RESET,
  ACCOUNT_RESET_PASSWORD_LOADING,
  ACCOUNT_RESET_PASSWORD_ERROR,
  ACCOUNT_RESET_PASSWORD_SUCCESS,
} from './account.constants';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_LOGIN_LOADING:
    case ACCOUNT_LOGOUT_LOADING:
    case ACCOUNT_RESET_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACCOUNT_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case ACCOUNT_LOGIN_ERROR:
    case ACCOUNT_LOGOUT_ERROR:
    case ACCOUNT_RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: null,
      };
    case ACCOUNT_RESET:
    case ACCOUNT_LOGOUT_SUCCESS:
    case ACCOUNT_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: null,
      };
    default:
      return state;
  }
};
