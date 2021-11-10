import React from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'

import UserForm from 'components/UserForm'

const CREATE_USER = gql`
  mutation Insert_users($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`

const NewUser = () => {
  const router = useRouter()
  const [createUser, { loading, error }] = useMutation(CREATE_USER)

  const onSubmit = ({ __typename, ...data }) => {
    createUser({
      variables: {
        object: {
          ...data,
        },
      },
    }).then((res) => {
      router.push(`/users/${res.data.insert_users_one.id}`)
    })
  }

  if (loading) return 'Creating...'
  if (error) return `Creation error! ${error.message}`

  return <UserForm onSubmit={onSubmit} />
}

export default NewUser
