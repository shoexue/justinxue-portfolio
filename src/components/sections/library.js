'use client'

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import sr from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`

const StyledContent = styled.div`
  width: 100%;
  margin-top: 20px;
`

const StyledLabel = styled.h4`
  font-size: ${fontSizes.smish};
  font-weight: normal;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  margin-top: 10px;
  padding-top: 0;
`

const StyledBookGrid = styled.div`
  position: relative;
  margin-top: 50px;
  width: 100%;

  .splide {
    padding: 1rem;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  .splide__track {
    overflow: visible;
  }

  .splide__slide {
    opacity: 0.5;
    transform: scale(0.9);
    transition: ${theme.transition};

    &.is-active {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const StyledBook = styled.div`
  ${mixins.boxShadow};
  position: relative;
  width: 100%;
  background-color: ${colors.lightGray};
  padding: 2rem;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};

  &:hover {
    transform: translateY(-5px);
  }
`

const StyledImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 150%; // 2:3 aspect ratio for book covers
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  background-color: ${colors.lightGray};

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const StyledBookInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`

const StyledBookTitle = styled.h5`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.lg};
  font-weight: 600;
  margin: 0 0 5px;
`

const StyledBookAuthor = styled.p`
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  margin: 0;
`

const Library = ({ title, images }) => {
  const revealTitle = useRef(null)
  const revealBooks = useRef(null)

  useEffect(() => {
    if (sr) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
      sr.reveal(revealBooks.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        viewFactor: 0.25,
      })
    }
  }, [])

  return (
    <StyledContainer id="library">
      <Heading ref={revealTitle}>
        <Dot>.</Dot>Library
      </Heading>

      <StyledContent>
        <StyledLabel>{title}</StyledLabel>

        <StyledBookGrid ref={revealBooks}>
          <Splide
            options={{
              type: 'loop',
              perPage: 4,
              focus: 'center',
              autoScroll: {
                speed: 1,
                pauseOnHover: true,
              },
              gap: '2rem',
              arrows: false,
              pagination: false,
              drag: true,
              breakpoints: {
                1200: {
                  perPage: 3,
                },
                768: {
                  perPage: 2,
                },
                480: {
                  perPage: 1,
                },
              },
            }}
            extensions={{ AutoScroll }}>
            {images &&
              images.map(({ frontmatter }, i) => {
                const { cover, title, author } = frontmatter
                return (
                  <SplideSlide key={i}>
                    <StyledBook>
                      <StyledImageContainer>
                        <Image
                          src={cover}
                          alt={title}
                          width={300}
                          height={450}
                          quality={95}
                          priority
                        />
                      </StyledImageContainer>
                      <StyledBookInfo>
                        <StyledBookTitle>{title}</StyledBookTitle>
                        <StyledBookAuthor>{author}</StyledBookAuthor>
                      </StyledBookInfo>
                    </StyledBook>
                  </SplideSlide>
                )
              })}
          </Splide>
        </StyledBookGrid>
      </StyledContent>
    </StyledContainer>
  )
}

Library.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
}

export default Library 