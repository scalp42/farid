import {
  FETCH_SUBSCRIPTIONS_REQUEST,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  RECEIVE_SUBSCRIPTIONS
} from '../actions/types';

const initialState = {
  isFetching: false,
  error: {},
  subscriptions: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_REQUEST:
      return [...state, isFetching: action.isFetching]
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return [...state, isFetching: action.isFetching]
    case FETCH_SUBSCRIPTIONS_FAILURE:
      return [...state, error: action.error]
    case RECEIVE_SUBSCRIPTIONS:
      return [...state, subscriptions: action.subscriptions]
    default:
      return state
  }
}
