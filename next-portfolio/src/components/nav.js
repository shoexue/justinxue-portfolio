'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { theme, mixins, media } from '../styles'
import { Menu } from '.'
import { IconLogo } from './icons'
const { colors, fontSizes, fonts } = theme

const navLinks = [
  {
    name: 'About',
    url: '/#about',
  },
  {
    name: 'Experience',
    url: '/#jobs',
  },
  {
    name: 'Work',
    url: '/#projects',
  },
  {
    name: 'Contact',
    url: '/#contact',
  },
]

const navHeight = 100

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
  height: ${props => (props.$scrollDirection === 'none' ? theme.navHeight : theme.navScrollHeight)};
  box-shadow: ${props =>
    props.$scrollDirection === 'up' ? `0 10px 30px -10px ${colors.shadowbg}` : 'none'};
  transform: translateY(
    ${props => (props.$scrollDirection === 'down' ? `-${theme.navScrollHeight}` : '0px')}
  );
  ${media.desktop`padding: 0 40px;`};
  ${media.tablet`padding: 0 25px;`};
`
const StyledNav = styled.nav`
  ${mixins.flexBetween};
  position: relative;
  width: 100%;
  color: ${colors.lightestSlate};
  font-family: ${fonts.SFMono};
  counter-reset: item 0;
  z-index: 12;
`
const StyledLogo = styled.div`
  ${mixins.flexCenter};
  a {
    display: block;
    color: ${colors.green};
    width: 42px;
    height: 42px;
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
const StyledHamburger = styled.div`
  ${mixins.flexCenter};
  overflow: visible;
  margin: 0 -12px 0 0;
  padding: 15px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
  display: none;
  ${media.tablet`display: flex;`};
`
const StyledHamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: ${theme.hamburgerWidth}px;
  height: 24px;
`
const StyledHamburgerInner = styled.div`
  background-color: ${colors.green};
  position: absolute;
  width: ${theme.hamburgerWidth}px;
  height: 2px;
  border-radius: ${theme.borderRadius};
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
    width: ${theme.hamburgerWidth}px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
  }
  &:before {
    width: ${props => (props.$menuOpen ? `100%` : `120%`)};
    top: ${props => (props.$menuOpen ? `0` : `-10px`)};
    opacity: ${props => (props.$menuOpen ? 0 : 1)};
    transition: ${props => (props.$menuOpen ? theme.hamBeforeActive : theme.hamBefore)};
  }
  &:after {
    width: ${props => (props.$menuOpen ? `100%` : `80%`)};
    bottom: ${props => (props.$menuOpen ? `0` : `-10px`)};
    transform: rotate(${props => (props.$menuOpen ? `-90deg` : `0`)});
    transition: ${props => (props.$menuOpen ? theme.hamAfterActive : theme.hamAfter)};
  }
`
const StyledLink = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 10px;
`
const StyledList = styled.ol`
  ${mixins.flexBetween};
  padding: 0;
  margin: 0;
  list-style: none;

  ${media.tablet`display: none;`};
`
const StyledListItem = styled.li`
  margin: 0 10px;
  position: relative;
  font-size: ${fontSizes.smish};
  counter-increment: item 1;

  &:before {
    content: '0' counter(item) '.';
    text-align: right;
    color: ${colors.green};
    font-size: ${fontSizes.xs};
  }
`

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('none')
  const [lastScrollTop, setLastScrollTop] = useState(0)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const handleScroll = () => {
    const fromTop = window.scrollY

    // Make sure they scroll more than DELTA
    if (Math.abs(lastScrollTop - fromTop) <= 5) {
      return
    }

    if (fromTop < 0) {
      setScrollDirection('none')
    } else if (fromTop > lastScrollTop && fromTop > 100) {
      if (scrollDirection !== 'down') {
        setScrollDirection('down')
      }
    } else if (fromTop + window.innerHeight < document.documentElement.scrollHeight) {
      if (scrollDirection !== 'up') {
        setScrollDirection('up')
      }
    }

    setLastScrollTop(fromTop)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true)
    }, 100)

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const timeout = isHome ? 3000 : 0
  const fadeClass = isHome ? 'fade' : ''
  const fadeDownClass = isHome ? 'fadedown' : ''

  return (
    <StyledContainer $scrollDirection={scrollDirection}>
      <StyledNav>
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <StyledLogo tabIndex="-1">
                <Link href="/" aria-label="home">
                  <IconLogo />
                </Link>
              </StyledLogo>
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledList>
                  {navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <StyledListItem
                        key={i}
                        style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                        <Link href={url}>
                          <StyledLink>{name}</StyledLink>
                        </Link>
                      </StyledListItem>
                    ))}
                </StyledList>

                <StyledHamburger onClick={toggleMenu}>
                  <StyledHamburgerBox>
                    <StyledHamburgerInner $menuOpen={menuOpen} />
                  </StyledHamburgerBox>
                </StyledHamburger>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>

        <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </StyledNav>
    </StyledContainer>
  )
}

Nav.propTypes = {
  isHome: PropTypes.bool,
}

export default Nav 