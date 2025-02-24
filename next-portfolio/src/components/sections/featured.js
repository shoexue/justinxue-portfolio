'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { FormattedIcon } from '../icons'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  
  .swiper {
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: ${colors.white};
    width: 40px;
    height: 40px;
    opacity: 0.75;
    &:hover {
      opacity: 1;
    }
    &:after {
      font-size: 20px;
    }
  }
  
  .swiper-pagination-bullet {
    background-color: ${colors.green};
  }
`
const StyledContent = styled.div`
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;
  ${media.thone`
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
  `};
  ${media.phablet`padding: 30px 25px 20px;`};
`
const StyledProjectName = styled.h5`
  font-size: 28px;
  margin: 0 0 20px;
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: 24px;`};
  ${media.thone`color: ${colors.white};`};
  a {
    ${media.tablet`display: block;`};
  }
`
const StyledDescription = styled.div`
  ${mixins.boxShadow};
  position: relative;
  z-index: 2;
  padding: 25px;
  background-color: ${colors.lightGray};
  color: ${colors.lightSlate};
  font-size: ${fontSizes.lg};
  border-radius: ${theme.borderRadius};
  ${media.thone`
    background-color: transparent;
    padding: 20px 0;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  `};
  p {
    margin: 0;
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
    max-width: 70vw;
  }
  a {
    ${mixins.inlineLink};
  }
`
const StyledTechList = styled.ul`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 25px 0 10px;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.green};
    margin-right: ${theme.margin};
    margin-bottom: 7px;
    white-space: nowrap;
    &:last-of-type {
      margin-right: 0;
    }
    ${media.thone`
      color: ${colors.green};
      margin-right: 10px;
    `};
  }
`
const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: ${colors.lightestSlate};
  a {
    padding: 10px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`
const StyledFeaturedImg = styled.div`
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1) brightness(90%);
  ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
  `};
`
const StyledImgContainer = styled.a`
  ${mixins.boxShadow};
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
  background-color: ${colors.white};
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  ${media.tablet`height: 100%;`};
  ${media.thone`
    grid-column: 1 / -1;
    opacity: 0.25;
  `};
  &:hover,
  &:focus {
    background: transparent;
    &:before,
    ${StyledFeaturedImg} {
      background: transparent;
      filter: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition: ${theme.transition};
    background-color: ${colors.navy};
    mix-blend-mode: screen;
    border-radius: ${theme.borderRadius};
  }
`
const StyledProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  align-items: center;
  margin: 0 auto;
  padding: 0 50px;
  max-width: 1600px;
  ${media.thone`
    display: block;
    padding: 0;
  `};
`
const StyledProject = styled.div`
  display: grid;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 70px;
  
  ${media.thone`
    margin-bottom: 70px;
  `};
  &:last-of-type {
    margin-bottom: 0;
  }
`

const Featured = ({ data }) => {
  const revealTitle = useRef(null)

  return (
    <StyledContainer id="projects">
      <Heading ref={revealTitle}>
        <Dot>.</Dot>projects ()
      </Heading>
      {data && data.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          centeredSlides={true}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          navigation={true}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          {data.map(({ frontmatter, html }, i) => {
            const { title, cover, tech, github, external } = frontmatter
            return (
              <SwiperSlide key={i}>
                <StyledProject>
                  <StyledProjectContainer>
                    <StyledContent>
                      <StyledProjectName>
                        {external ? (
                          <a
                            href={external}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            aria-label="External Link"
                          >
                            {title}
                          </a>
                        ) : (
                          title
                        )}
                      </StyledProjectName>
                      <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
                      {tech && (
                        <StyledTechList>
                          {tech.map((tech, i) => (
                            <li key={i}>{tech}</li>
                          ))}
                        </StyledTechList>
                      )}
                      <StyledLinkWrapper>
                        {github && (
                          <a
                            href={github}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            aria-label="GitHub Link"
                          >
                            <FormattedIcon name="GitHub" />
                          </a>
                        )}
                        {external && (
                          <a
                            href={external}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            aria-label="External Link"
                          >
                            <FormattedIcon name="External" />
                          </a>
                        )}
                      </StyledLinkWrapper>
                    </StyledContent>
                    <StyledImgContainer
                      href={external ? external : github ? github : '#'}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <StyledFeaturedImg>
                        <Image
                          src={`/featured/${cover}`}
                          alt={title}
                          width={700}
                          height={438}
                          quality={95}
                          priority
                          style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: theme.borderRadius,
                          }}
                        />
                      </StyledFeaturedImg>
                    </StyledImgContainer>
                  </StyledProjectContainer>
                </StyledProject>
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </StyledContainer>
  )
}

Featured.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Featured 