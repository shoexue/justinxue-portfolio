'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme, mixins, media } from '../styles'
const { colors, fontSizes, fonts } = theme

// X Icon SVG component
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const StyledModal = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${colors.transLightGray};
  border-radius: ${theme.borderRadius};
  padding: 30px;

  ${media.tablet`
    width: 95%;
    padding: 20px;
  `};
`

const StyledHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`

const StyledTitle = styled.h2`
  font-size: ${fontSizes.xxl};
  font-family: ${fonts.SFMono};
  font-weight: 500;
  color: ${colors.white};
  margin: 0;
`

const StyledCloseButton = styled.button`
  background-color: transparent;
  color: ${colors.lightSlate};
  border: none;
  width: 35px;
  height: 35px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transition};
  
  &:hover,
  &:focus {
    color: ${colors.white};
    transform: scale(1.1);
  }
`

const VideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.borderRadius};
  
  video {
    width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius};
    background-color: ${colors.transLightestGray};
  }
`

const StyledDescription = styled.p`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.md};
  color: ${colors.slate};
  margin: 20px 0;
  line-height: 1.5;
`

const VideoModal = ({ isOpen, onClose, videoSrc, title, description }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledContainer onClick={onClose}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledHeader>
          <StyledTitle>{title || 'Project Demo'}</StyledTitle>
          <StyledCloseButton onClick={onClose}>
            <XIcon />
          </StyledCloseButton>
        </StyledHeader>
        
        {description && <StyledDescription>{description}</StyledDescription>}
        
        <VideoContainer>
          <video
            controls
            autoPlay
            playsInline
            width="100%"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoContainer>
      </StyledModal>
    </StyledContainer>
  );
};

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string
};

export default VideoModal; 