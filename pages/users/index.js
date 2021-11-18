import React, { useMemo, useState } from 'react'
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
  justify-content: space-between;
  gap: 1rem;
`

const Users = () => {
  const router = useRouter()
  const { data, loading, error, refetch } = useUsers()
  const [deleteUser, { loading: deleteUserLoading }] = useDeleteUser()
  const initialState = useMemo(
    () => ({ sortBy: [{ id: 'id', desc: true }] }),
    []
  )
  const [search, setSearch] = useState('')
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
    [router, deleteUser, refetch]
  )

  if (error) return <p>Error :(</p>

  return (
    <>
      {(loading || deleteUserLoading) && <Spinner />}
      <FlexContainer>
        <ItemsRight>
          <input name="search" onChange={(e) => setSearch(e.target.value)} />
          <Button type="button" onClick={() => router.push('/users/new-user')}>
            New User
          </Button>
        </ItemsRight>
        <Table
          initialState={initialState}
          columns={columns}
          data={data?.users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          )}
          onClickRow={({ id }) => router.push(`/users/${id}`)}
        />
      </FlexContainer>
    </>
  )
}

export default Users
