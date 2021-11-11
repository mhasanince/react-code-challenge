import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
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

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const schema = yup
  .object({
    name: yup.string().required('Name is a required field'),
    lastname: yup.string().required('Last name is a required field'),
    email: yup
      .string()
      .email('Must be a valid email.')
      .required('Email is a required field'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    date_of_birth: yup
      .date()
      .max(new Date(), 'Date cannot be in the future')
      .required('Birth date is a required field'),
  })
  .required()

const UserForm = ({ onSubmit }) => {
  const router = useRouter()
  const { id } = router.query
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) })
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useUser({ id, options: { skip: !id } })

  useEffect(() => {
    if (user) {
      reset(user.users_by_pk)
    }
  }, [user, reset])

  if (userLoading) return <Spinner />
  if (userError) return `Error! ${userError.message}`

  console.log(errors)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Input
          label="Name"
          type="text"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Last Name"
          type="text"
          {...register('lastname')}
          error={errors.lastname?.message}
        />
        <Input
          label="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          subLabel="(05551234567)"
          type="number"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <DatePicker label="Birth Date" name="date_of_birth" control={control} />
      </FormGroup>
      <StyledButton type="submit">Submit</StyledButton>
    </Form>
  )
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default UserForm
