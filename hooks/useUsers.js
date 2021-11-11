import { useQuery, gql } from '@apollo/client'

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

export default () => useQuery(GET_USERS)
