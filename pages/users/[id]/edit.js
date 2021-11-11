import React from 'react'
import { useRouter } from 'next/router'

import UserForm from 'components/UserForm'
import Spinner from 'components/Spinner'
import useUpdateUser from 'hooks/useUpdateUser'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const [update, { error, loading }] = useUpdateUser(id)

  const onSubmit = ({ __typename, ...data }) => {
    update(data).then(() => {
      router.push('/users')
    })
  }

  if (error) return `Submission error! ${error.message}`

  return (
    <>
      {loading && <Spinner />}
      <UserForm onSubmit={onSubmit} />
    </>
  )
}

export default User
