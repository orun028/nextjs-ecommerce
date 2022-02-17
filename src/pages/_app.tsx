import theme from 'theme'
import 'theme/styles.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import store from '@/lib/redux/store'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Provider store={store}>
        <SWRConfig value={{
          onError: (error, key) => {
            if (error.status !== 403 && error.status !== 404) {
              console.log('Global Error Report')
              // We can send the error to Sentry,
              // or show a notification UI.
            }
          }
        }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp;