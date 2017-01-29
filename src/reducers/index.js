import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'
import UserReducer from './UserReducer'
import SubscriptionReducer from './SubscriptionReducer'

export default combineReducers({
  user: UserReducer,
  subscriptions: SubscriptionReducer,
  form: FormReducer
})
