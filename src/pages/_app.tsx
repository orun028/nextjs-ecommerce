import theme from 'theme'
import 'theme/styles.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { useStore } from '@/lib/redux'
import '@/lib/firebase/config'
import { AuthProvider } from '@/hook/auth'
import { AuthStateChanged } from '@/lib/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <AuthStateChanged>
        <Provider store={store}>
          <PersistGate loading={<div>loading</div>} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
        </AuthStateChanged>
        
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp;