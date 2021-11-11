import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import Typography from './Typography'

const Label = styled.label`
  width: 100%;
`

const StyledDatePicker = styled(ReactDatePicker)`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  outline: none;
  border: ${(props) => `1px solid ${props.theme.colors.border}`};
`

const DatePicker = ({ label, name, control, ...props }) => {
  const {
    field: { ref, value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: 'You must enter your birth date',
    },
    defaultValue: new Date(),
  })

  return (
    <Label>
      <Typography>{label}</Typography>
      <StyledDatePicker
        selected={new Date(value)}
        onChange={onChange}
        {...props}
        ref={ref}
      />
      {error && (
        <Typography variant="subtitle" color="danger">
          {error.message}
        </Typography>
      )}
    </Label>
  )
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.shape().isRequired,
}

export default DatePicker
