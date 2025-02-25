'use client'

import React, { useState, useEffect, useCallback, useRef, Container, Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { theme, mixins, media, Dot } from '../styles'
import { Menu } from '.'
const { colors, fontSizes, fonts, loaderDelay } = theme

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

const navHeight = 120

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
`;
const StyledNav = styled.nav`
  ${mixins.flexBetween};
  position: relative;
  width: 100%;
  color: ${colors.lightestSlate};
  font-weight: 200;
  font-family: ${fonts.SFMono};
  counter-reset: item 0;
  z-index: 12;
`;
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
`;
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
`;
const StyledHamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: ${theme.hamburgerWidth}px;
  height: 24px;
`;
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
`;
const StyledLink = styled.div`
  display: flex;
  align-items: center;
  ${media.tablet`display: none;`};
`;
const StyledList = styled.ol`
  ${mixins.flexBetween};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const StyledListItem = styled.li`
  margin: 0 10px;
  position: relative;
  font-size: ${fontSizes.smish};
  counter-increment: item 1;
  // Removed the :before section that added the numbers
`;

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

  &.active {
    color: ${colors.green};
  }
`;

const DELTA = 5;

// Add throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 175 96">
    <title>{'<ay/>'}</title>
    <text x="28" y="65" fill="currentColor" fontSize="50px" fontFamily="Source Code Pro, monospace" fontWeight="300">
      {'<ay/>'}
    </text>
  </svg>
);

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: !props.isHome,
      menuOpen: false,
      scrollDirection: 'none',
      lastScrollTop: 0,
      activeHash: '',
    };

    // Create refs
    this.logoRef = React.createRef();
    this.hamburgerRef = React.createRef();
    this.navLinksRef = navLinks.map(() => React.createRef());

    // Bind methods
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);

    // Create throttled versions of handlers
    this.throttledScrollHandler = throttle(this.handleScroll, 100);
    this.throttledResizeHandler = throttle(this.handleResize, 100);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isMounted: true }, () => {
        window.addEventListener('scroll', this.throttledScrollHandler);
        window.addEventListener('resize', this.throttledResizeHandler);
        window.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('hashchange', this.handleHashChange);
        
        // Set initial active hash
        this.handleHashChange();
      });
    }, 100);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollHandler);
    window.removeEventListener('resize', this.throttledResizeHandler);
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

  handleScroll() {
    const { isMounted, menuOpen, scrollDirection, lastScrollTop } = this.state;
    const fromTop = window.scrollY;

    // Make sure they scroll more than DELTA
    if (!isMounted || Math.abs(lastScrollTop - fromTop) <= DELTA || menuOpen) {
      return;
    }

    if (fromTop < DELTA) {
      this.setState({ scrollDirection: 'none' });
    } else if (fromTop > lastScrollTop && fromTop > navHeight) {
      if (scrollDirection !== 'down') {
        this.setState({ scrollDirection: 'down' });
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      if (scrollDirection !== 'up') {
        this.setState({ scrollDirection: 'up' });
      }
    }

    this.setState({ lastScrollTop: fromTop });
  }

  handleResize() {
    if (window.innerWidth > 768 && this.state.menuOpen) {
      this.toggleMenu();
    }
  }

  handleKeydown(e) {
    if (!this.state.menuOpen) {
      return;
    }

    if (e.which === 27 || e.key === 'Escape') {
      this.toggleMenu();
    }
  }

  handleHashChange() {
    this.setState({ activeHash: window.location.hash });
  }

  render() {
    const { isMounted, menuOpen, scrollDirection, activeHash } = this.state;
    const { isHome } = this.props;
    const timeout = isHome ? loaderDelay : 0;
    const fadeClass = isHome ? 'fade' : '';
    const fadeDownClass = isHome ? 'fadedown' : '';

    return (
      <StyledContainer $scrollDirection={scrollDirection}>
        <Head>
          <style>{`
            body {
              ${menuOpen ? 'filter: blur(5px);' : ''}
            }
          `}</style>
        </Head>
        <StyledNav>
          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={fadeClass} timeout={timeout} nodeRef={this.logoRef}>
                <StyledLogo tabIndex="-1" ref={this.logoRef}>
                  {isHome ? (
                    <a href="/" aria-label="home">
                      <IconLogo />
                    </a>
                  ) : (
                    <Link href="/" aria-label="home" passHref legacyBehavior>
                      <a>
                        <IconLogo />
                      </a>
                    </Link>
                  )}
                </StyledLogo>
              </CSSTransition>
            )}
          </TransitionGroup>

          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={fadeClass} timeout={timeout} nodeRef={this.hamburgerRef}>
                <StyledHamburger onClick={this.toggleMenu} ref={this.hamburgerRef}>
                  <StyledHamburgerBox>
                    <StyledHamburgerInner $menuOpen={menuOpen} />
                  </StyledHamburgerBox>
                </StyledHamburger>
              </CSSTransition>
            )}
          </TransitionGroup>

          <StyledLink>
            <StyledList>
              <TransitionGroup component={null}>
                {isMounted &&
                  navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <CSSTransition 
                      key={i} 
                      classNames={fadeDownClass} 
                      timeout={timeout} 
                      nodeRef={this.navLinksRef[i]}
                    >
                      <StyledListItem
                        ref={this.navLinksRef[i]}
                        style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}
                      >
                        <Link href={url} passHref legacyBehavior>
                          <StyledListLink
                            className={activeHash === url.split('#')[1] ? 'active' : ''}
                          >
                            <Dot>.</Dot>
                            {name}
                          </StyledListLink>
                        </Link>
                      </StyledListItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </StyledList>
          </StyledLink>
        </StyledNav>

        <Menu menuOpen={menuOpen} toggleMenu={this.toggleMenu} />
      </StyledContainer>
    );
  }
}

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
