import _ from 'lodash'
import { hashHistory } from 'react-router'
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  RECEIVE_USER_INFO
} from './types'

import fetch from 'isomorphic-fetch'
import axios from 'axios'


// email actions for sendgrid
export function sendEmail(email) {
  return dispatch => {
    dispatch(sendEmailRequest())
    axios.post('', { email })
      .then(response => {
        dispatch(sendEmailSuccess())
      }, error => {
        dispatch(sendEmailFailure(error))
      })
  }
}

export function sendEmailRequest() {
  return { type: SEND_EMAIL_REQUEST, isPosting: true }
}

export function sendEmailSuccess() {
  return { type: SEND_EMAIL_SUCCESS, isPosting: false }
}

export function sendEmailFailure(error) {
  return { type: SEND_EMAIL_FAILURE, error }
}


// user info actions
export function fetchUserInfo() {
  return dispatch => {
    dispatch(fetchUserInfoRequest())
    return axios.post('/api/user/info', { email }) // use post to 'fetch'
      .then(response => {
        dispatch(receiveUserInfo(response))
        dispatch(fetchUserInfoSuccess())
      }, error => {
        dispatch(fetchUserInfoFailure(error))
      })
  }
}

export function fetchUserInfoRequest() {
  return { type: FETCH_USER_INFO_REQUEST, isFetching: true }
}

export function fetchUserInfoSuccess() {
  return { type: FETCH_USER_INFO_SUCCESS, isFetching: false }
}

export function fetchUserInfoFailure(error) {
  return { type: FETCH_USER_INFO_FAILURE, error }
}

export function receiveUserInfo(userInfo) {
  return { type: RECEIVE_USER_INFO, userInfo }
}
