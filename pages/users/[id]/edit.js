import React from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'

import UserForm from 'components/UserForm'

const UPDATE_USER = gql`
  mutation Mutation_root(
    $pkColumns: users_pk_columns_input!
    $set: users_set_input
  ) {
    update_users_by_pk(pk_columns: $pkColumns, _set: $set) {
      date_of_birth
      email
      lastname
      name
      phone
      id
    }
  }
`

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER)

  const onSubmit = ({ __typename, ...data }) => {
    updateUser({
      variables: {
        pkColumns: {
          id,
        },
        set: {
          ...data,
        },
      },
    }).then(() => {
      router.push('/users')
    })
  }

  if (loading) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`

  return <UserForm onSubmit={onSubmit} />
}

export default User
