'use client'

import React, { useState } from 'react'
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
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  background-color: ${colors.lightGray};
  transition: ${theme.transition};
  z-index: 11;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  width: 100% !important;
  height: ${theme.navHeight} !important;
  display: flex !important;
  justify-content: center !important;
`

const StyledNav = styled.nav`
  ${mixins.flexBetween};
  position: relative;
  width: 100% !important;
  max-width: 1200px !important;
  padding: 0 25px !important;
  color: ${colors.lightestSlate};
  font-weight: 200;
  font-family: ${fonts.SFMono};
  counter-reset: item 0;
  z-index: 12;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
`

const StyledLogo = styled.div`
  ${mixins.flexCenter};
  position: relative !important;
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
  display: flex !important;
  align-items: center !important;
  ${media.tablet`display: none !important;`};
`

const StyledList = styled.ol`
  ${mixins.flexBetween};
  padding: 0 !important;
  margin: 0 !important;
  list-style: none;
  display: flex !important;
  justify-content: flex-end !important;
`

const StyledListItem = styled.li`
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  font-size: ${fontSizes.smish};
  
  &:not(:last-child) {
    margin-right: 20px !important;
  }
`

const StyledListLink = styled.a`
  padding: 12px 0 !important;
  display: flex !important;
  align-items: center !important;
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

const StyledHamburger = styled.button`
  display: none;
  ${media.tablet`display: flex;`};
  position: relative;
  z-index: 13;
  margin-left: 15px;
  padding: 15px;
  border: 0;
  background-color: transparent;
  color: ${colors.lightestSlate};
  text-transform: none;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;

  &:focus {
    outline: none;
  }
`

const StyledHamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 24px;
`

const StyledHamburgerInner = styled.div`
  background-color: ${colors.green};
  position: absolute;
  width: 30px;
  height: 2px;
  border-radius: 3px;
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${props => (props.$menuOpen ? `0.12s` : `0s`)};
  transform: rotate(${props => (props.$menuOpen ? `225deg` : `0deg`)});
  transition-timing-function: cubic-bezier(
    ${props => (props.$menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
  );
  &:before,
  &:after {
    content: '';
    display: block;
    background-color: ${colors.green};
    position: absolute;
    left: auto;
    right: 0;
    width: 30px;
    height: 2px;
    border-radius: 3px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
  }
  &:before {
    width: ${props => (props.$menuOpen ? `100%` : `120%`)};
    top: ${props => (props.$menuOpen ? `0` : `-10px`)};
    opacity: ${props => (props.$menuOpen ? 0 : 1)};
    transition: ${props =>
      props.$menuOpen ? theme.hamBeforeActive : theme.hamBefore};
  }
  &:after {
    width: ${props => (props.$menuOpen ? `100%` : `80%`)};
    bottom: ${props => (props.$menuOpen ? `0` : `-10px`)};
    transform: rotate(${props => (props.$menuOpen ? `-90deg` : `0`)});
    transition: ${props => (props.$menuOpen ? theme.hamAfterActive : theme.hamAfter)};
  }
`

const StyledMobileMenu = styled.div`
  display: none;
  ${media.tablet`display: block;`};
  position: fixed;
  top: ${theme.navHeight};
  bottom: 0;
  right: 0;
  width: 100%;
  height: calc(100vh - ${theme.navHeight});
  z-index: 12;
  outline: 0;
  transition: ${theme.transition};
  transform: translateX(${props => (props.$menuOpen ? 0 : 100)}vw);
  visibility: ${props => (props.$menuOpen ? 'visible' : 'hidden')};
  background-color: ${colors.shadowbg};
  backdrop-filter: blur(10px);
`

const StyledMobileNav = styled.nav`
  ${mixins.flexCenter};
  flex-direction: column;
  color: ${colors.lightestSlate};
  font-family: ${fonts.SFMono};
  text-align: center;
  padding: 50px;
  height: 100%;
  width: 100%;
`

const StyledMobileList = styled.ol`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    position: relative;
    margin: 0 auto 20px;
    font-size: ${fontSizes.xl};
    counter-increment: item 1;

    a {
      ${mixins.link};
      width: 100%;
      padding: 3px 20px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.white};
      &:hover,
      &:focus {
        color: ${colors.green};
      }
    }
  }
`

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <StyledHamburger onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <StyledHamburgerBox>
            <StyledHamburgerInner $menuOpen={menuOpen} />
          </StyledHamburgerBox>
        </StyledHamburger>

        <StyledMobileMenu $menuOpen={menuOpen}>
          <StyledMobileNav>
            <StyledMobileList>
              {navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link href={url} passHref legacyBehavior>
                    <a onClick={() => setMenuOpen(false)}>
                      <Dot>.</Dot>
                      {name}
                    </a>
                  </Link>
                </li>
              ))}
            </StyledMobileList>
          </StyledMobileNav>
        </StyledMobileMenu>
      </StyledNav>
    </StyledContainer>
  )
}

export default Nav
