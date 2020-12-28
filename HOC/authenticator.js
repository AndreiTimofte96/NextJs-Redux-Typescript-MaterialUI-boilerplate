import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { checkSessionAndRedirect, checkLoginSessionAndRedirect } from '../actions/authenticatorActions'

const unauthenticatedRoutes = ['/', '/login']

const Authenticator = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector(state => state.authenticator)
  const [authNotNeeded, setAuthNotNeeded] = useState(false)
  const { pathname } = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('myToken')

      if (pathname === '/login' && token) {
        const isAuthenticated = await dispatch(checkLoginSessionAndRedirect(token))
        setAuthNotNeeded(!isAuthenticated)
        return
      }

      // if it is a route that requires authentication
      if (unauthenticatedRoutes.indexOf(pathname) === -1) {
        setAuthNotNeeded(false)
        dispatch(checkSessionAndRedirect(token))
      } else { //if not
        setAuthNotNeeded(true)
      }
    })()
  }, [pathname])

  if (isLoading) return <CircularProgress color="secondary" />

  if (!isLoading && (isAuthenticated || authNotNeeded)) return children

  return null
}

export default Authenticator