import theme from 'theme'
import 'theme/styles.css'
import type { AppContext, AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import App from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
/* MyApp.getInitialProps = async (appContext: AppContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
} */

export default MyApp
