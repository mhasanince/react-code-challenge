import { gql, useMutation } from '@apollo/client'

const CREATE_USER = gql`
  mutation Insert_users($object: users_insert_input!) {
    insert_users_one(object: $object) {
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
  const [createUser, result] = useMutation(CREATE_USER)

  const create = async (user) => {
    await createUser({
      variables: {
        object: {
          ...user,
        },
      },
    })
  }

  return [create, result]
}
