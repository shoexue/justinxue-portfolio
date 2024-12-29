// src/components/sections/library.js

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Heading, Section, Dot, media, theme } from '@styles';
const { colors, fontSizes, fonts } = theme;
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/dist/css/splide.min.css';

const initAnimation = keyframes`
  0% {
    transform: rotateY(-8deg);
  }
  100% {
    transform: rotateY(-30deg);
  }
`;

/* Styled Components */
const StyledLibraryContainer = styled(Section)`
  position: relative;
  padding: 4rem 2rem;
  background: transparent;
  text-align: center;
`;

const StyledSubtext = styled.p`
  margin: 0 auto;
  font-size: ${fontSizes.md};
  margin-top: 5px;
  margin-bottom: 1rem;
  text-align: left;
  font-family: ${fonts.SFMono};
  color: ${colors.slate};
  ${media.tablet`font-size: 24px;`};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 1rem;
`;

const StyledSplide = styled(Splide)`
  .splide__track {
    overflow-x: hidden; /* Hide horizontal overflow */
    overflow-y: visible; /* Allow vertical overflow to show highlights */
  }

  .splide__list {
    display: flex;
    align-items: center;
    height: 370px;
  }

  .splide__slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BookContainer = styled.div`
  display: flex;
  height: 400px;
  align-items: center;
  justify-content: center;
  perspective: 600px;
`;

const Book = styled.div`
  width: 200px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transform: ${props => (props.active ? 'rotateY(-8deg)' : 'rotateY(-30deg)')};
  transition: transform 1s ease;
  animation: 1s ease 0s 1 ${initAnimation};

  &:hover {
    transform: rotateY(-8deg);
  }
`;

const FrontCoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 300px;
  transform: translateZ(15px);
  border-radius: 0 2px 2px 0;
  box-shadow: 5px 3px 20px rgba(102, 102, 102, 0.5);
  object-fit: fill; /* Ensures image fits within container without clipping */
  display: block;
`;

const BookPages = styled(Book)`
  &::before {
    position: absolute;
    content: '';
    background-color: blue;
    left: 0;
    top: 1px;
    width: 28px;
    height: 298px;
    transform: translateX(184px) rotateY(90deg);
    background: linear-gradient(
      90deg,
      #fff 0%,
      #f9f9f9 5%,
      #fff 10%,
      #f9f9f9 15%,
      #fff 20%,
      #f9f9f9 25%,
      #fff 30%,
      #f9f9f9 35%,
      #fff 40%,
      #f9f9f9 45%,
      #fff 50%,
      #f9f9f9 55%,
      #fff 60%,
      #f9f9f9 65%,
      #fff 70%,
      #f9f9f9 75%,
      #fff 80%,
      #f9f9f9 85%,
      #fff 90%,
      #f9f9f9 95%,
      #fff 100%
    );
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 200px;
    height: 300px;
    transform: translateZ(-15px);
    background-color: #01060f;
    border-radius: 0 2px 2px 0;
    box-shadow: -4px 0 20px rgba(102, 102, 102, 0.9);
  }
`;

/* Library Component */
const Library = ({ title, images }) => {
  const revealHeading = useRef(null);
  const revealSubtext = useRef(null);
  const revealCarousel = useRef(null);
  const splideRef = useRef(null); // Reference to Splide instance
  const [paused, setPaused] = useState(false); // Carousel pause state
  const [activeBooks, setActiveBooks] = useState({}); // State to track active book animations

  useEffect(() => {
    // Initialize ScrollReveal animations
    sr.reveal(revealHeading.current, srConfig());
    sr.reveal(revealSubtext.current, srConfig());
    sr.reveal(revealCarousel.current, srConfig());
  }, []);

  const handleBookClick = index => {
    // Detect if the device is touch-capable
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {return;} // Do nothing if not a touch device

    // Toggle the pause state
    if (splideRef.current) {
      if (paused) {
        splideRef.current.splide.play(); // Resume AutoScroll
      } else {
        splideRef.current.splide.pause(); // Pause AutoScroll
      }
      setPaused(!paused); // Update the paused state
    }

    // Toggle the active state for the clicked book
    setActiveBooks(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const duplicatedImages = [...images, ...images];

  const splideOptions = {
    type: 'loop',
    autoScroll: {
      pauseOnHover: true,
      pauseOnFocus: false,
      rewind: true,
      speed: 1,
    },
    arrows: false,
    pagination: false,
    fixedWidth: '200px',
    gap: '3rem',
  };

  const descriptionText = '// my impeccable taste in books, obviously.';

  return (
    <StyledLibraryContainer id="library">
      <TransitionGroup component={null}>
        <CSSTransition classNames="fadeup" timeout={300}>
          <StyledHeading ref={revealHeading}>
            <Dot>.</Dot>
            {title}
          </StyledHeading>
        </CSSTransition>
        <CSSTransition classNames="fadeup" timeout={300}>
          <StyledSubtext ref={revealSubtext}>{descriptionText}</StyledSubtext>
        </CSSTransition>
      </TransitionGroup>

      <div className="carousel-container" ref={revealCarousel}>
        <StyledSplide
          options={splideOptions}
          extensions={{ AutoScroll }}
          ref={splideRef} // Assign the Splide instance to the ref
        >
          {duplicatedImages.map(({ node }, index) => {
            const imageSrc = node.childImageSharp?.fluid?.src || node.publicURL;

            return (
              <SplideSlide key={index}>
                <BookContainer>
                  <BookPages
                    onClick={() => handleBookClick(index)} // Handle clicks on books
                    active={activeBooks[index]} // Apply active state for animation
                  >
                    <FrontCoverImage src={imageSrc} alt={`Book Cover ${index + 1}`} />
                  </BookPages>
                </BookContainer>
              </SplideSlide>
            );
          })}
        </StyledSplide>
      </div>
    </StyledLibraryContainer>
  );
};

Library.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({
            src: PropTypes.string,
          }),
        }),
        publicURL: PropTypes.string,
      }).isRequired,
    }),
  ).isRequired,
};

export default Library;
