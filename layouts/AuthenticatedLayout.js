import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'

import Navbar from 'components/Navbar'
import Header from 'components/Header'
import MobileNavbar from 'components/MobileNavbar'

const Main = styled.main`
  padding-left: 300px;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    padding-left: 0;
    padding-top: 74px;
  }
`

const Container = styled.div`
  margin: 1.5rem auto;
  padding: 0 1.5rem;
`

const AuthenticatedLayout = ({ children }) => (
  <>
    <Head>
      <title>90Pixel React Code Challenge</title>
    </Head>
    <Navbar />
    <MobileNavbar />
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
