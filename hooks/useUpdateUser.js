import { gql, useMutation } from '@apollo/client'

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

export default () => {
  const [updateUser, result] = useMutation(UPDATE_USER)

  const update = async (user) => {
    await updateUser({
      variables: {
        pkColumns: { id: user.id },
        set: {
          date_of_birth: user.date_of_birth,
          email: user.email,
          lastname: user.lastname,
          name: user.name,
          phone: user.phone,
        },
      },
    })
  }

  return [update, result]
}
