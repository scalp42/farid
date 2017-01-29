import _ from 'lodash'
import { hashHistory } from 'react-router'
import {
  FETCH_SUBSCRIPTIONS_REQUEST,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  RECEIVE_SUBSCRIPTIONS
} from './types'

import fetch from 'isomorphic-fetch'
import axios from 'axios'


export function fetchSubscriptions() {
  return dispatch => {
    dispatch(fetchSubscriptionsRequest())
    return axios.post('api/subscription/info', { email })
      .then(response => {
        dispatch(receiveSubscriptions(response))
      }, error => {
        dispatch(fetchSubscriptionsFailure(error))
      })
  }
}

export function fetchSubscriptionsRequest() {
  return { type: FETCH_SUBSCRIPTIONS_REQUEST, isFetching: true }
}

export function fetchSubscriptionsSuccess(subscriptions) {
  return { type: FETCH_SUBSCRIPTIONS_SUCCESS, isFetching: false }
}

export function fetchSubscriptionsFailure(error) {
  return { type: FETCH_SUBSCRIPTIONS_FAILURE, error }
}

export function receiveSubscriptions(subscriptions) {
  return { type: RECEIVE_SUBSCRIPTIONS, subscriptions }
}
