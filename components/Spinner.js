import React from 'react'
import styled from 'styled-components'

const StyledSpinner = styled.div`
  text-align: center;
  /* width: 64px;
  height: 64px;
  margin: auto;
  background-color: #212121; */
`

const Spinner = () => <StyledSpinner>Loading...</StyledSpinner>

export default Spinner
