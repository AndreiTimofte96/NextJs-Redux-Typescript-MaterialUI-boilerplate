import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { checkAndRedirect } from '../actions/authenticatorActions'

const Authenticator = ({ children, router }) => {
  const dispatch = useDispatch()
  const { isLoading, authNotNeeded, isAuthenthicated } = useSelector(state => state.authenticator)

  useEffect(() => {
    dispatch(checkAndRedirect(router, isAuthenthicated))
  }, [router.pathname])

  if (isLoading) return <CircularProgress color="secondary" />

  if (!isLoading && (isAuthenthicated || authNotNeeded)) return children

  return null
}

export default Authenticator