import React from 'react'
import styled from 'styled-components'
import Avatar, { genConfig } from 'react-nice-avatar'

import Typography from './Typography'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 1rem 2rem;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.border}`};
`
const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 0.5rem;
`

const StyledAvatar = styled(Avatar)`
  width: 2rem;
  height: 2rem;
`

const Header = () => {
  const config = genConfig()

  return (
    <StyledHeader>
      <Profile>
        <StyledAvatar {...config} />
        <Typography>John Doe</Typography>
      </Profile>
    </StyledHeader>
  )
}

export default Header
