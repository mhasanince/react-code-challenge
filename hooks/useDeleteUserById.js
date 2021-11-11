import { gql, useMutation } from '@apollo/client'

const DELETE_USER = gql`
  mutation Delete_users_by_pk($deleteUsersByPkId: Int!) {
    delete_users_by_pk(id: $deleteUsersByPkId) {
      date_of_birth
      email
      id
      lastname
      name
      phone
    }
  }
`

export default (id) => {
  const [deleteUserById, result] = useMutation(DELETE_USER)

  const deleteUser = async (userId) => {
    await deleteUserById({ variables: { deleteUsersByPkId: id || userId } })
  }

  return [deleteUser, { ...result }]
}
