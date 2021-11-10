import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'

import Navbar from 'components/Navbar'
import Header from 'components/Header'

const Main = styled.main`
  padding-left: 300px;
`

const Container = styled.div`
  margin: 1.5rem auto;
  /* max-width: 960px; */
  padding: 0 1.5rem;
`

const AuthenticatedLayout = ({ children }) => (
  <>
    <Head>
      <title>90Pixel React Code Challenge</title>
      <meta name="description" content="90Pixel React Code Challenge" />
    </Head>
    <Navbar />
    <Main>
      <Header />
      <Container>{children}</Container>
    </Main>
  </>
)

AuthenticatedLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthenticatedLayout
