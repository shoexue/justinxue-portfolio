'use client'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Loader, Nav, Social, Email, Footer } from '.'
import styled from 'styled-components'
import { GlobalStyle, theme } from '../styles'
import { usePathname } from 'next/navigation'
const { colors, fontSizes, fonts } = theme

const SkipToContent = styled.a`
  position: absolute;
  top: auto;
  left: -999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -99;
  &:focus,
  &:active {
    outline: 0;
    color: ${colors.green};
    background-color: ${colors.lightGray};
    border-radius: ${theme.borderRadius};
    padding: 18px 23px;
    font-size: ${fontSizes.sm};
    font-family: ${fonts.SFMono};
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: ${theme.transition};
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: auto;
    z-index: 99;
  }
`
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Layout = ({ children }) => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsLoading(isHome)
  }, [isHome])

  // During SSR or before hydration, render a simpler version
  if (!isMounted) {
    return (
      <div id="root">
        <GlobalStyle />
        <StyledContent>
          <Nav isHome={isHome} />
          <div id="content">
            {children}
            <Footer />
          </div>
        </StyledContent>
      </div>
    )
  }

  return (
    <div id="root">
      <GlobalStyle />
      <SkipToContent href="#content">Skip to Content</SkipToContent>
      {isLoading && isHome ? (
        <Loader finishLoading={() => setIsLoading(false)} />
      ) : (
        <StyledContent>
          <Nav isHome={isHome} />
          <Social isHome={isHome} />
          <Email isHome={isHome} />
          <div id="content">
            {children}
            <Footer />
          </div>
        </StyledContent>
      )}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout 