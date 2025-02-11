'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme, mixins, media } from '../styles'
const { colors, fontSizes, fonts } = theme

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: ${theme.transition};
`

const StyledModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${colors.bg};
  padding: 30px;
  border-radius: ${theme.borderRadius};
  ${media.tablet`padding: 25px;`};
  ${media.phablet`padding: 20px;`};
`

const StyledCloseButton = styled.button`
  ${mixins.smallButton};
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px;
  line-height: 1;
  border-radius: 50%;
  ${media.tablet`top: 15px; right: 15px;`};
  ${media.phablet`top: 10px; right: 10px;`};
`

const StyledTitle = styled.h2`
  font-size: ${fontSizes.xxl};
  margin-bottom: 20px;
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: ${fontSizes.xl};`};
`

const StyledContent = styled.div`
  font-family: ${fonts.Calibre};
  font-size: ${fontSizes.lg};
  color: ${colors.slate};
  line-height: 1.5;
  ${media.tablet`font-size: ${fontSizes.md};`};
`

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <StyledModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <StyledModalContent>
        <StyledCloseButton onClick={onClose}>×</StyledCloseButton>
        <StyledTitle>{title}</StyledTitle>
        <StyledContent dangerouslySetInnerHTML={{ __html: content }} />
      </StyledModalContent>
    </StyledModalOverlay>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Modal 