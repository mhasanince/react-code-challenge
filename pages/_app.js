import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apolloClient'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import reset from 'styled-reset'

import AuthenticatedLayout from 'layouts/AuthenticatedLayout'

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap');
    font-family: 'Montserrat', sans-serif !important;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.text};
  }
`

const theme = {
  colors: {
    primary: '#212121',
    secondary: '#ff9800',
    success: '#4caf50',
    danger: '#f44336',
    warning: '#ffc107',
    text: '#212121',
    background: '#fafafa',
    border: 'rgba(0, 0, 0, 0.1)',
  },
}

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthenticatedLayout>
          <GlobalStyles />
          <Component {...pageProps} />
        </AuthenticatedLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape().isRequired,
}

export default MyApp
