import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from '../styles'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp 