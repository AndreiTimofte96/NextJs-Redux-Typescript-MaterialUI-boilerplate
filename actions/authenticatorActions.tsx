import Router from 'next/router'
import * as types from '../types/authenticatorTypes'
import { Dispatch } from 'redux'

interface AuthResponseI {
  isAuthenticated: boolean,
  token: string,
}

export const checkSessionAndRedirect = (token: string | null) => async (dispatch: Dispatch<types.AuthenticatorDispatchTypes>) => {
  // if we dont have a token, redirect to authentication page
  if (!token) {
    return Router.push('/login')
  }

  try {
    dispatch(setIsLoading(true))
    const response: AuthResponseI = await authenticatorService(token)
    dispatch(setIsLoading(false))

    if (response.isAuthenticated) {
      dispatch(setIsSuccess(true))
    } else {
      Router.push('/login')
    }
  } catch (err) {
    dispatch(setIsLoading(false))
    dispatch(setIsError(true, err.message))
    Router.push('/login')
  }
}

export const checkLoginSessionAndRedirect = (token: string) =>
  async (dispatch: Dispatch<types.AuthenticatorDispatchTypes>): Promise<boolean> => {
    try {
      dispatch(setIsLoading(true))
      const response: AuthResponseI = await authenticatorService(token)
      dispatch(setIsLoading(false))
      if (response.isAuthenticated) {
        Router.push('/ssr-page')
      }
      return response.isAuthenticated
    }
    catch (err) {
      return false
    }
  }

const setIsLoading = (isLoading: boolean): types.AuthenticatorLoadingI => ({
  type: types.AUTHENTICATOR_LOADING,
  payload: isLoading,
})

const setIsSuccess = (isAuthenticated: boolean): types.AuthenticatorSuccessI => ({
  type: types.AUTHENTICATOR_SUCCESS,
  payload: isAuthenticated,
})

const setIsError = (isError: boolean, errorMessage: string): types.AuthenticatorErrorI => ({
  type: types.AUTHENTICATOR_ERROR,
  payload: isError,
  errorMessage,
})

const authenticatorService = (token: string): Promise<AuthResponseI> =>
  new Promise<AuthResponseI>((resolve, reject) =>
    setTimeout(() => {
      const threeMinutes: number = 1000 * 60 * 1

      if (JSON.parse(token) + threeMinutes > new Date().getTime()) {
        resolve({
          isAuthenticated: true,
          token,
        })
      } else {
        resolve({
          isAuthenticated: false,
          token,
        })
      }
    }, 3000)
  )

export const autoLogout = (milliseconds: number): ReturnType<typeof setTimeout> =>
  setTimeout(() => {
    localStorage.removeItem('myToken')
    Router.reload()
  }, milliseconds)
