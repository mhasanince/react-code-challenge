import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Avatar, { genConfig } from 'react-nice-avatar'
import { Menu, X } from 'styled-icons/boxicons-regular'
import { ROUTES } from 'utils/contants'

import Typography from './Typography'

const StyledMobileNavbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}px) {
    display: none;
  }
`
const Logo = styled.img`
  width: 64px;
  height: auto;
`

const NavbarContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 74px;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: calc(100vh - 74px);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}px) {
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

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  gap: 0.5rem;
`

const StyledAvatar = styled(Avatar)`
  margin: 1rem 0;
  width: 2rem;
  height: 2rem;
`

const MobileNavbar = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const config = genConfig()

  // TODO: Find better solution
  useEffect(() => {
    const body = document.querySelector('body')
    if (isOpen) body.style.overflow = 'hidden'
    else body.style.overflow = 'auto'
  }, [isOpen])

  return (
    <>
      <StyledMobileNavbar>
        <Logo src="https://90pixel-frontend-code-challenge.vercel.app/logo.svg" />
        <Typography as="h1" variant="h3" align="center">
          React Code Challenge
        </Typography>
        {isOpen ? (
          <X size="32" onClick={() => setIsOpen(false)} cursor="pointer" />
        ) : (
          <Menu size="32" onClick={() => setIsOpen(true)} cursor="pointer" />
        )}
      </StyledMobileNavbar>
      <NavbarContainer isOpen={isOpen}>
        <Profile>
          <StyledAvatar {...config} />
          <Typography>John Doe</Typography>
        </Profile>
        <nav>
          <NavbarItems>
            <NavbarItems>
              {ROUTES.map((item, index) => {
                const active = router.pathname.includes(item.href)

                return (
                  <NavbarItem key={index} active={active}>
                    <Link href={item.href} passHref>
                      {/* eslint-disable-next-line */}
                      <a
                        onClick={() => setIsOpen(false)}
                        style={{ textDecoration: 'none' }}
                      >
                        <Typography
                          as="div"
                          variant="h2"
                          style={{
                            color: active ? 'white' : '#212121',
                          }}
                        >
                          {item.label}
                        </Typography>
                      </a>
                    </Link>
                  </NavbarItem>
                )
              })}
            </NavbarItems>
          </NavbarItems>
        </nav>
      </NavbarContainer>
    </>
  )
}

export default MobileNavbar
