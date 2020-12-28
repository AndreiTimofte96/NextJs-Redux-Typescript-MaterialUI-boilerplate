import { combineReducers } from 'redux'
import { authenticatorReducer, ssrReducer } from '../reducers'

const rootReducers = {
  ssr: ssrReducer,
  authenticator: authenticatorReducer
}

export default combineReducers(rootReducers)