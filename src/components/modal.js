'use client'

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme, mixins } from '@/styles'
import { FormattedIcon } from './icons'
const { colors, fontSizes } = theme

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const StyledModal = styled.div`
  position: relative;
  width: 600px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${colors.lightGray};
  border-radius: ${theme.borderRadius};
  padding: 20px;
`

const StyledHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 20px;
`

const StyledTitle = styled.h2`
  font-size: ${fontSizes.xxl};
  margin: 0;
`

const StyledCloseButton = styled.button`
  ${mixins.bigButton};
  padding: 10px;
  margin-left: 20px;
  background-color: transparent;
  color: ${colors.lightSlate};
  &:hover,
  &:focus {
    background-color: transparent;
    color: ${colors.white};
  }
`

const Modal = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <StyledContainer onClick={onClose}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledHeader>
          <StyledTitle>{title}</StyledTitle>
          <StyledCloseButton onClick={onClose}>
            <FormattedIcon name="Close" />
          </StyledCloseButton>
        </StyledHeader>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </StyledModal>
    </StyledContainer>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Modal 