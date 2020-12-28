export const AUTHENTICATOR_LOADING = 'AUTHENTICATOR_LOADING'
export const AUTHENTICATOR_SUCCESS = 'AUTHENTICATOR_SUCCESS'
export const AUTHENTICATOR_ERROR = 'AUTHENTICATOR_ERROR'

export interface AuthenticatorLoadingI {
  type: typeof AUTHENTICATOR_LOADING,
  payload: boolean
}

export interface AuthenticatorSuccessI {
  type: typeof AUTHENTICATOR_SUCCESS,
  payload: boolean
}

export interface AuthenticatorErrorI {
  type: typeof AUTHENTICATOR_ERROR,
  payload: boolean,
  errorMessage: string,
}

export type AuthenticatorDispatchTypes = AuthenticatorLoadingI | AuthenticatorSuccessI | AuthenticatorErrorI
