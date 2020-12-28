import { useMemo } from 'react'
import { createStore, Store, applyMiddleware, } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducers from './reducers'

let store: Store | undefined

const initStore = (initialState: object) =>
  createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

export const initializeStore = (preloadedState: object) => {
  let _store: Store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    /* tslint:disable-next-line */
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export const useStore = (initialState: object) => {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export type RootStore = ReturnType<typeof rootReducers>;
