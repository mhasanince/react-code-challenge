import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Typography from './Typography'

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
`

const Label = styled.label`
  width: 100%;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  outline: none;
  border: ${(props) => `1px solid ${props.theme.colors.border}`};

  & ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const Input = forwardRef(({ label, subLabel, error, ...props }, ref) => (
  <Label>
    <FlexContainer>
      <Typography>{label}</Typography>
      {subLabel && (
        <Typography as="span" variant="subtitle">
          {subLabel}
        </Typography>
      )}
    </FlexContainer>
    <StyledInput {...props} ref={ref} />
    {error && (
      <Typography variant="subtitle" color="danger">
        {error}
      </Typography>
    )}
  </Label>
))

Input.propTypes = {
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  error: PropTypes.string,
}

Input.defaultProps = {
  subLabel: '',
  error: null,
}

export default Input
