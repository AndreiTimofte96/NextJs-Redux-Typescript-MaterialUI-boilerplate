import * as types from '../store/types'

const initialState = {
  isLoading: false,
  authNotNeeded: false,
  isAuthenthicated: false,
  isError: false,
  errorMessage: '',
}

const authenticatorReducer = (state = initialState, { type, payload, errorMessage }) => {
  switch (type) {
    case types.AUTHENTICATOR_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case types.AUTHENTICATOR_AUTH_NOT_NEEDED:
      return {
        ...state,
        authNotNeeded: payload,
      }
    case types.AUTHENTICATOR_SUCCESS:
      return {
        isLoading: false,
        authNotNeeded: false,
        isAuthenthicated: payload,
        isError: false,
        errorMessage: '',
      }
    case types.AUTHENTICATOR_ERROR:
      return {
        isLoading: false,
        authNotNeeded: false,
        isAuthenthicated: false,
        isError: payload,
        errorMessage,
      }
    default:
      return state
  }
}

export default authenticatorReducer
