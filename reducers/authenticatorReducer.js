import * as types from '../store/types'

const initialState = {
  isLoading: false,
  isAuthenticated: false,
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
    case types.AUTHENTICATOR_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: payload,
        isError: false,
        errorMessage: '',
      }
    case types.AUTHENTICATOR_ERROR:
      return {
        isLoading: false,
        isAuthenticated: false,
        isError: payload,
        errorMessage,
      }
    default:
      return state
  }
}

export default authenticatorReducer
