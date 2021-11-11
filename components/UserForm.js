import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import useUser from 'hooks/useUser'

import Input from './Input'
import Form from './Form'
import Button from './Button'
import DatePicker from './DatePicker'
import Spinner from './Spinner'

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`
const StyledButton = styled(Button)`
  margin-top: 1rem;
`

const UserForm = ({ onSubmit }) => {
  const router = useRouter()
  const { id } = router.query
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm()
  const { data: user, loading: userLoading, error: userError } = useUser(id)

  useEffect(() => {
    if (user) {
      reset(user.users_by_pk)
    }
  }, [user, reset])

  if (userLoading) return <Spinner />
  if (userError) return `Error! ${userError.message}`

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Input
          label="Name"
          type="text"
          {...register('name', { required: 'You must enter your name' })}
          error={errors.name?.message}
        />
        <Input
          label="Last Name"
          type="text"
          {...register('lastname', {
            required: 'You must enter your last name',
          })}
          error={errors.lastname?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email', { required: 'You must enter your email' })}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          subLabel="(05551234567)"
          type="number"
          {...register('phone', {
            required: 'You must enter your phone number',
          })}
          error={errors.phone?.message}
        />
        <DatePicker
          label="Birth Date"
          name="date_of_birth"
          control={control}
          error={errors.date_of_birth?.message}
        />
      </FormGroup>
      <StyledButton type="submit">Submit</StyledButton>
    </Form>
  )
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default UserForm
