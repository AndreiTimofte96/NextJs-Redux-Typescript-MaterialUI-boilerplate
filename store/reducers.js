import { combineReducers } from 'redux'
import { authenticatorReducer, SSRReducer } from '../reducers'

const reducers = {
  ssr: SSRReducer,
  authenticator: authenticatorReducer
}

export default combineReducers(reducers)