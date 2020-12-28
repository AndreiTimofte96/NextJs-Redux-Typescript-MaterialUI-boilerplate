import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { checkSessionAndRedirect, checkLoginSessionAndRedirect } from '../actions/authenticatorActions'
import { RootStore } from '../store/store'
import styles from '../styles/Login.module.css'

interface PropsI {
  children: JSX.Element
}

const unauthenticatedRoutes: Array<string> = ['/', '/login']

const Authenticator = ({ children }: PropsI): JSX.Element | null => {
  const { isLoading, isAuthenticated } = useSelector((state: RootStore) => state.authenticator)
  const [authNotNeeded, setAuthNotNeeded] = useState(false)
  const { pathname } = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    (async (): Promise<void> => {
      const token: string | null = localStorage.getItem('myToken')
      setAuthNotNeeded(false)
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

  if (isLoading) {
    return (
      <div className={styles.spinnerWrapper}>
        <CircularProgress size={100} color="secondary" />
      </div>
    )
  }

  if (!isLoading && (isAuthenticated || authNotNeeded)) {
    return children
  }

  return null
}

export default Authenticator