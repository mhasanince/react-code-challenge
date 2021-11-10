import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const VARIANTS = {
  body1: {
    fontSize: '1rem',
    fontWeight: '400',
  },
  body2: {
    fontSize: '.875rem',
    fontWeight: '400',
  },
  h1: {
    fontSize: '2rem',
    fontWeight: '700',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  h3: {
    fontSize: '1.125rem',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '.75rem',
    fontWeight: '300',
  },
}

const Component = styled.div`
  font-size: ${(props) => VARIANTS[props.variant].fontSize};
  font-weight: ${(props) => VARIANTS[props.variant].fontWeight};
  text-decoration: none;
  color: ${({ color, theme }) => theme.colors[color]};
`

const Typography = forwardRef(({ children, variant, color, ...props }, ref) => (
  <Component {...props} variant={variant} color={color} ref={ref}>
    {children}
  </Component>
))

Typography.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  color: PropTypes.string,
}

Typography.defaultProps = {
  children: null,
  variant: 'body1',
  color: 'inherit',
}

export default Typography
