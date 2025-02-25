'use client'

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { theme, mixins, media } from '@/styles'
const { colors } = theme

const StyledSideElement = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${props => (props.$orientation === 'left' ? '40px' : 'auto')};
  right: ${props => (props.$orientation === 'left' ? 'auto' : '40px')};
  z-index: 10;
  color: ${colors.lightSlate};
  ${media.desktop`right: 25px;`};
  ${media.tablet`display: none;`};
`

const Side = ({ children, isHome, orientation }) => {
  const [isMounted, setIsMounted] = useState(!isHome)
  const sideRef = useRef(null)

  useEffect(() => {
    if (!isHome) {
      return
    }
    const timeout = setTimeout(() => setIsMounted(true), 2000)
    return () => clearTimeout(timeout)
  }, [isHome])

  return (
    <StyledSideElement $orientation={orientation}>
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? 2000 : 0} nodeRef={sideRef}>
            <div ref={sideRef}>{children}</div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </StyledSideElement>
  )
}

Side.propTypes = {
  children: PropTypes.node.isRequired,
  isHome: PropTypes.bool,
  orientation: PropTypes.string,
}

export default Side 