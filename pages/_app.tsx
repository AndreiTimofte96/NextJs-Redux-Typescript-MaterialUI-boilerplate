import { Provider } from 'react-redux'
import { useStore } from '../store/store'
import { Authenticator } from '../HOC'
import '../styles/globals.css'
import type { AppProps } from 'next/app'


const MyApp = ({ Component, pageProps }: AppProps): any => {
  const store = useStore(pageProps)

  return (
    <Provider store={store}>
      <Authenticator>
        <Component {...pageProps} />
      </Authenticator>
    </Provider>
  )
}

export default MyApp
