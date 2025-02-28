'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { theme, mixins, media, Dot } from '../styles'
const { colors, fontSizes, fonts } = theme

const navLinks = [
  {
    name: 'about ()',
    url: '/#about',
  },
  {
    name: 'experiences ()',
    url: '/#jobs',
  },
  {
    name: 'projects ()',
    url: '/#projects',
  },
  {
    name: 'contact ()',
    url: '/#contact',
  },
]

const StyledContainer = styled.header`
  ${mixins.flexBetween};
  position: fixed;
  top: 0;
  padding: 0px 50px;
  background-color: ${colors.lightGray};
  transition: ${theme.transition};
  z-index: 11;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  width: 100%;
  height: ${theme.navHeight};
  ${media.desktop`padding: 0 40px;`};
  ${media.tablet`padding: 0 25px;`};
`

const StyledNav = styled.nav`
  ${mixins.flexBetween};
  position: relative;
  width: 100%;
  color: ${colors.lightestSlate};
  font-weight: 200;
  font-family: ${fonts.SFMono};
  counter-reset: item 0;
  z-index: 12;
`

const StyledLogo = styled.div`
  ${mixins.flexCenter};
  a {
    display: block;
    color: ${colors.green};
    width: 60px;
    height: 60px;
    &:hover,
    &:focus {
      svg {
        fill: ${colors.transGreen};
      }
    }
    svg {
      fill: none;
      transition: ${theme.transition};
      user-select: none;
    }
  }
`

const StyledLink = styled.div`
  display: flex;
  align-items: center;
  ${media.tablet`display: none;`};
`

const StyledList = styled.ol`
  ${mixins.flexBetween};
  padding: 0;
  margin: 0;
  list-style: none;
`

const StyledListItem = styled.li`
  margin: 0 10px;
  position: relative;
  font-size: ${fontSizes.smish};
`

const StyledListLink = styled.a`
  padding: 12px 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${colors.lightestSlate};
  
  &:hover,
  &:focus {
    color: ${colors.green};
  }
`

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 175 96">
    <title>{'<ay/>'}</title>
    <text x="28" y="65" fill="currentColor" fontSize="50px" fontFamily="Source Code Pro, monospace" fontWeight="300">
      {'<ay/>'}
    </text>
  </svg>
)

const Nav = () => {
  return (
    <StyledContainer>
      <StyledNav>
        <StyledLogo>
          <Link href="/" passHref legacyBehavior>
            <a aria-label="home">
              <IconLogo />
            </a>
          </Link>
        </StyledLogo>

        <StyledLink>
          <StyledList>
            {navLinks.map(({ url, name }, i) => (
              <StyledListItem key={i}>
                <Link href={url} passHref legacyBehavior>
                  <StyledListLink>
                    <Dot>.</Dot>
                    {name}
                  </StyledListLink>
                </Link>
              </StyledListItem>
            ))}
          </StyledList>
        </StyledLink>
      </StyledNav>
    </StyledContainer>
  )
}

export default Nav
