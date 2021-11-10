import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  background: ${({ color, theme }) => theme.colors[color]};
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
`

const Button = ({ children, color, ...props }) => (
  <StyledButton color={color} {...props}>
    {children}
  </StyledButton>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
}

Button.defaultProps = {
  color: 'primary',
}

export default Button
