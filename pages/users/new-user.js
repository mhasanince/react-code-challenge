import React from 'react'
import { useRouter } from 'next/router'
import useCreateUser from 'hooks/useCreateUser'

import UserForm from 'components/UserForm'
import Spinner from 'components/Spinner'

const NewUser = () => {
  const router = useRouter()
  const [create, { loading, error }] = useCreateUser()

  const onSubmit = ({ __typename, ...data }) => {
    create(data).then(() => {
      router.push(`/users`)
    })
  }

  if (loading) return <Spinner />
  if (error) return `Creation error! ${error.message}`

  return <UserForm onSubmit={onSubmit} />
}

export default NewUser
