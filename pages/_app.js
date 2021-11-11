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
    font-family: 'Montserrat', sans-serif !important;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.text};
  }
`

const theme = {
  colors: {
    primary: '#212121',
    success: '#4caf50',
    danger: '#f44336',
    warning: '#ffc107',
    text: '#212121',
    border: 'rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
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
