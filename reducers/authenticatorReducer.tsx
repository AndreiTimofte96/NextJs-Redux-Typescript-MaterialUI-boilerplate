import {
  AuthenticatorDispatchTypes,
  AUTHENTICATOR_LOADING,
  AUTHENTICATOR_SUCCESS,
  AUTHENTICATOR_ERROR,
} from '../types/authenticatorTypes'

interface InitialStateI {
  isLoading: boolean,
  isAuthenticated: boolean,
  isError: boolean,
  errorMessage: string,
}

const initialState: InitialStateI = {
  isLoading: false,
  isAuthenticated: false,
  isError: false,
  errorMessage: '',
}

const authenticatorReducer = (state: InitialStateI = initialState, action: AuthenticatorDispatchTypes): InitialStateI => {
  switch (action.type) {
    case AUTHENTICATOR_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case AUTHENTICATOR_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: action.payload,
        isError: false,
        errorMessage: '',
      }
    case AUTHENTICATOR_ERROR:
      return {
        isLoading: false,
        isAuthenticated: false,
        isError: action.payload,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

export default authenticatorReducer
