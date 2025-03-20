'use client'

import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Image from 'next/image'
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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  
  ${media.tablet`
    grid-template-columns: 1fr;
    gap: 20px;
  `};
`

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  height: 0;
  padding-bottom: 66.67%;
  background-color: ${colors.darkBg};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const VideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.borderRadius};
  margin-top: 10px;
  
  video {
    width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius};
    background-color: ${colors.transLightestGray};
  }
  
  ${media.tablet`
    margin-top: 0;
  `};
`

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`

const PlayButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${colors.green};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  
  svg {
    width: 20px;
    height: 20px;
    fill: ${colors.darkBg};
  }
`

const VideoCaption = styled.div`
  color: ${colors.white};
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: 500;
  text-align: center;
`

const SectionTitle = styled.h3`
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-weight: 500;
  font-size: ${fontSizes.md};
  margin: 0 0 20px 0;
`

const GalleryModal = ({ isOpen, onClose }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  if (!isOpen) {
    return null;
  }

  const handleVideoClick = () => {
    setPlaying(!playing);
    const video = document.getElementById('gallery-video');
    if (video) {
      if (playing) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  return (
    <StyledContainer onClick={onClose}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledHeader>
          <StyledTitle>Lovelytics Project Gallery</StyledTitle>
          <StyledCloseButton onClick={onClose}>
            <XIcon />
          </StyledCloseButton>
        </StyledHeader>
        
        <SectionTitle>Team Photos</SectionTitle>
        <GalleryGrid>
          <GalleryItem>
            <StyledImage 
              src="/lovelytics/Team1.jpg" 
              alt="Lovelytics Team Photo 1" 
              fill
              style={{ objectFit: "cover" }}
              quality={95}
            />
          </GalleryItem>
          
          <GalleryItem>
            <StyledImage 
              src="/lovelytics/Team2.jpg" 
              alt="Lovelytics Team Photo 2"
              fill
              style={{ objectFit: "cover" }}
              quality={95} 
            />
          </GalleryItem>
        </GalleryGrid>
        
        <SectionTitle style={{ marginTop: '30px' }}>Project Demo</SectionTitle>
        <VideoContainer ref={videoRef}>
          <video
            id="gallery-video"
            controls={playing}
            playsInline
            poster=""
            onClick={handleVideoClick}
          >
            <source src="/lovelytics/optimized/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!playing && (
            <VideoOverlay onClick={handleVideoClick}>
              <PlayButton>
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </PlayButton>
              <VideoCaption>Watch our demo</VideoCaption>
            </VideoOverlay>
          )}
        </VideoContainer>
      </StyledModal>
    </StyledContainer>
  );
};

GalleryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GalleryModal; 