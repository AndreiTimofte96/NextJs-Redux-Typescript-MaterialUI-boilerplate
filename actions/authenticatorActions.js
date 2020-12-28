import Router from 'next/router'
import * as types from '../store/types'


export const checkSessionAndRedirect = (token) => async (dispatch) => {
  // if we dont have a token, redirect to authentication page
  if (!token) {
    return Router.push('/login')
  }

  try {
    dispatch(setIsLoading(true))
    const response = await authenticatorService(token)
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

export const checkLoginSessionAndRedirect = (token) => async (dispatch) => {
  dispatch(setIsLoading(true))
  const response = await authenticatorService(token)
  dispatch(setIsLoading(false))

  if (response.isAuthenticated) {
    Router.push('/ssr-page')
  }
  return response.isAuthenticated
}

const setIsLoading = (isLoading) => ({
  type: types.AUTHENTICATOR_LOADING,
  payload: isLoading,
})

const setIsSuccess = (isAuthenticated) => ({
  type: types.AUTHENTICATOR_SUCCESS,
  payload: isAuthenticated,
})

const setIsError = (isError, errorMessage) => ({
  type: types.AUTHENTICATOR_ERROR,
  payload: isError,
  errorMessage,
})

const authenticatorService = (token) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const threeMinutes = 1000 * 60 * 1

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

export const autoLogout = (milliseconds) =>
  setTimeout(() => {
    localStorage.removeItem('myToken')
    Router.reload()
  }, milliseconds)
