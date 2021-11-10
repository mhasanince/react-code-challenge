import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery, gql, useMutation } from '@apollo/client'
import styled from 'styled-components'

import Table from 'components/Table'
import Spinner from 'components/Spinner'
import TableActions from 'components/TableActions'
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

const GET_USERS = gql`
  query Users {
    users {
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

const Users = () => {
  const router = useRouter()
  const { data, loading, error, refetch } = useQuery(GET_USERS)
  const [deleteUser] = useMutation(DELETE_USER)

  const initialState = useMemo(
    () => ({ sortBy: [{ id: 'id', desc: true }] }),
    []
  )
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Last Name',
        accessor: 'lastname',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Birth Date',
        accessor: 'date_of_birth',
      },
      {
        id: 'actions',
        Cell: TableActions,
        onClickEdit: ({ id }) => router.push(`/users/${id}/edit`),
        onClickDelete: ({ id }) =>
          deleteUser({ variables: { deleteUsersByPkId: id } }).then(() =>
            refetch()
          ),
      },
    ],
    []
  )

  if (loading) return <Spinner />
  if (error) return <p>Error :(</p>

  return (
    <FlexContainer>
      <ItemsRight>
        <Button type="button" onClick={() => router.push('/users/new-user')}>
          New User
        </Button>
      </ItemsRight>
      <Table
        initialState={initialState}
        columns={columns}
        data={data.users}
        onClickRow={({ id }) => router.push(`/users/${id}`)}
      />
    </FlexContainer>
  )
}

export default Users
