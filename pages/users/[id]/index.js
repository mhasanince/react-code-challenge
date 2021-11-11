import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useUser from 'hooks/useUser'
import useDeleteUser from 'hooks/useDeleteUser'

import Typography from 'components/Typography'
import Button from 'components/Button'
import Spinner from 'components/Spinner'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const ItemsRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const USER_TEMPLATE = [
  { field: 'name', label: 'Name' },
  { field: 'lastname', label: 'Lastname' },
  { field: 'email', label: 'Email' },
  { field: 'phone', label: 'Phone' },
  { field: 'date_of_birth', label: 'Date of birth' },
]

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useUser({ id })
  const [deleteUser, { loading: deleteUserLoading }] = useDeleteUser(id)

  if (error) return <p>Error :(</p>
  if (data?.users_by_pk === null) return <p>User not found</p>

  return (
    <>
      {(loading || deleteUserLoading) && <Spinner />}
      <FlexContainer>
        <ItemsRight>
          <Button
            type="button"
            color="warning"
            onClick={() => router.push(`/users/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            type="button"
            color="danger"
            onClick={() => deleteUser().then(() => router.push('/users'))}
          >
            Delete
          </Button>
        </ItemsRight>
        <UserContainer>
          {USER_TEMPLATE.map(({ field, label }, index) => (
            <InfoContainer key={index}>
              <Typography as="h3" variant="h3">
                {label}
              </Typography>
              <Typography>{data?.users_by_pk[field] || '-'}</Typography>
            </InfoContainer>
          ))}
        </UserContainer>
      </FlexContainer>
    </>
  )
}

export default User
