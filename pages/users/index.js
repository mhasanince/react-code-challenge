import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useUsers from 'hooks/useUsers'
import useDeleteUser from 'hooks/useDeleteUser'

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

const Users = () => {
  const router = useRouter()
  const { data, loading, error, refetch } = useUsers()
  const [deleteUser] = useDeleteUser()
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
        onClickDelete: ({ id }) => deleteUser(id).then(() => refetch()),
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
