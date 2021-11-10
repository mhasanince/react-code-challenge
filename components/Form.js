import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledForm = styled.form``

const Form = ({ children, ...props }) => (
  <StyledForm {...props}>{children}</StyledForm>
)

Form.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Form
