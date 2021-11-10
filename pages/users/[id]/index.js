import React from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'

import Typography from 'components/Typography'
import Button from 'components/Button'

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

const DELETE_USER = gql`
  mutation Delete_users_by_pk($deleteUsersByPkId: Int!) {
    delete_users_by_pk(id: $deleteUsersByPkId) {
      id
    }
  }
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
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { usersByPkId: id },
  })
  const [deleteUser] = useMutation(DELETE_USER)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
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
          onClick={() =>
            deleteUser({ variables: { deleteUsersByPkId: id } }).then(() =>
              router.push('/users')
            )
          }
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
            <Typography>{data.users_by_pk[field] || '-'}</Typography>
          </InfoContainer>
        ))}
      </UserContainer>
    </FlexContainer>
  )
}

export default User
