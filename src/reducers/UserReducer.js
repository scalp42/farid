import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  RECEIVE_USER_INFO
} from '../actions/types';

const initialState = {
  isPosting: false,
  isFetching: false,
  error: {},
  userInfo: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_EMAIL_REQUEST:
      return [...state, isPosting: action.isPosting];
    case SEND_EMAIL_SUCCESS:
      return [...state, isPosting: action.isPosting];
    case SEND_EMAIL_FAILURE:
      return [...state, error: action.error];
    case FETCH_USER_INFO_REQUEST:
      return [...state, isFetching: action.isFetching];
    case FETCH_USER_INFO_SUCCESS:
      return [...state, isFetching: action.isFetching];
    case FETCH_USER_INFO_FAILURE:
      return [...state, error: action.error];
    case RECEIVE_USER_INFO:
      return [...state, userInfo: action.userInfo];
    default:
      return state;
  }
};
