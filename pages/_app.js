import { Provider } from 'react-redux'
import { useStore } from '../store/store'
import { Authenticator } from '../HOC'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps, router }) => {
  const store = useStore(pageProps)

  return (
    <Provider store={store}>
      <Authenticator router={router}>
        <Component {...pageProps} />
      </Authenticator>
    </Provider>
  )
}

export default MyApp
