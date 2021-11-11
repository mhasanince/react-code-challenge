import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { ROUTES } from 'utils/contants'

import Typography from './Typography'

const Aside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-right: ${(props) => `1px solid ${props.theme.colors.border}`};
  gap: 6rem;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    display: none;
  }
`

const NavbarItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const NavbarItem = styled.li`
  padding: 0.75rem;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.text : 'transparent'};
  cursor: pointer;
`

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.img`
  width: 128px;
  height: auto;
`

const Navbar = () => {
  const router = useRouter()

  return (
    <Aside>
      <LogoContainer>
        <Logo src="https://90pixel-frontend-code-challenge.vercel.app/logo.svg" />
        <Typography variant="h1" align="center">
          React Code Challenge
        </Typography>
      </LogoContainer>
      <nav>
        <NavbarItems>
          {ROUTES.map((item, index) => {
            const active = router.pathname.includes(item.href)

            return (
              <NavbarItem key={index} active={active}>
                <Link href={item.href} passHref>
                  <Typography
                    as="div"
                    variant="h2"
                    style={{
                      color: active ? 'white' : '#212121',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              </NavbarItem>
            )
          })}
        </NavbarItems>
      </nav>
    </Aside>
  )
}

export default Navbar
