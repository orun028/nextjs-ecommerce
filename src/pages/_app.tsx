import theme from 'theme'
import 'theme/styles.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { useStore } from '@/lib/redux'
import { SessionProvider } from "next-auth/react"
import { Loading } from '@/components/ui'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <SessionProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        session={pageProps.session}
      >
        <Provider store={store}>
          <PersistGate loading={<Loading/>} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp;