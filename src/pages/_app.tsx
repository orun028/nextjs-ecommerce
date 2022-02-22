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
          refreshInterval: 60*60*24,
          fetcher: (url: RequestInfo) => fetch(url).then((res) => res.json()),
          onError: (error, key) => {
            if (error.status !== 403 && error.status !== 404) {
              console.log(error)
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