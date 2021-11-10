import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import Input from 'components/Input'
import Form from 'components/Form'
import Button from 'components/Button'
import DatePicker from 'components/DatePicker'

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`
const StyledButton = styled(Button)`
  margin-top: 1rem;
`

const GET_USER = gql`
  query Users_by_pk($usersByPkId: Int!) {
    users_by_pk(id: $usersByPkId) {
      date_of_birth
      email
      id
      lastname
      name
      phone
    }
  }
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
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER, {
    variables: { usersByPkId: id },
    skip: !id,
  })

  useEffect(() => {
    if (user) {
      reset(user.users_by_pk)
    }
  }, [user])

  if (userLoading) return 'Loading...'
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
