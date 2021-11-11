import { gql, useQuery } from '@apollo/client'

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

export default (id) =>
  useQuery(GET_USER, {
    variables: { usersByPkId: id },
  })
