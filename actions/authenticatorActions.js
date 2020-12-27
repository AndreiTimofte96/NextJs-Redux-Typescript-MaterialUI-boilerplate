import Router from 'next/router'
import * as types from '../store/types'

const unauthenticatedRoutes = ['/', '/login']

export const checkAndRedirect = (router, isAuthenthicated) => async (dispatch) => {

  dispatch(setIsAuthNotNeeded(false))
  if (unauthenticatedRoutes.indexOf(router.pathname) !== -1) { // if it is a route that doesn't require authentication
    return dispatch(setIsAuthNotNeeded(true))
  }

  if (isAuthenthicated) return; //discutabil

  const token = localStorage.getItem('myToken')
  if (!token) { // if we dont have a token, redirect to authentication page
    return Router.push('/login')
  }

  try {
    dispatch(setIsLoading(true))
    const response = await authenticatorService(token)
    dispatch(setIsLoading(false))

    if (response.isAuthenthicated) {
      return dispatch(setIsSuccess(true))
    }

    return Router.push('/login')

  } catch (err) {
    dispatch(setIsLoading(false))
    dispatch(setIsError(true, err.message))
    return Router.push('/login')
  }
}

const setIsLoading = (isLoading) => ({
  type: types.AUTHENTICATOR_LOADING,
  payload: isLoading,
})

const setIsAuthNotNeeded = (authNotNeeded) => ({
  type: types.AUTHENTICATOR_AUTH_NOT_NEEDED,
  payload: authNotNeeded,
})

const setIsSuccess = (isAuthenthicated) => ({
  type: types.AUTHENTICATOR_SUCCESS,
  payload: isAuthenthicated,
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
          isAuthenthicated: true,
          token,
        })
      } else {
        resolve({
          isAuthenthicated: false,
          token,
        })
      }
    }, 3000)
  )

