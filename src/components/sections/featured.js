import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import 'swiper/swiper-bundle.min.css';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading, Dot } from '@styles';
const { colors, fontSizes, fonts } = theme;
// Install modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;

  .swiper-container {
    max-width: 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: ${colors.transWhite};
    width: 10px;
  }
  .swiper-pagination-bullet {
    background-color: ${colors.green};
  }
`;
const StyledContent = styled.div`
  padding-left: 10px;
  position: relative;
  grid-column: 1 / 8;
  grid-row: 1 / -1;
  ${media.thone`
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
    max-width: 70vw;
  `};
  ${media.phablet`
    padding: 30px 25px 20px;
    max-width: 70vw;
    `};
`;
const StyledProjectName = styled.h5`
  font-size: 28px;
  margin: 0 0 20px;
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: 24px;`};
  ${media.thone`color: ${colors.white};`};
  a {
    ${media.tablet`display: block;`};
  }
`;
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
`;
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
`;
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
`;
const StyledFeaturedImg = styled(Img)`
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
  border-radius: ${theme.borderRadius};
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1) brightness(90%); // Start with black and white
  transition: filter 0.3s ease-out; // Smooth transition for filter changes
  ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
  `};
`;

const StyledImgContainer = styled.a`
  ${mixins.boxShadow};
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
  border-radius: ${theme.radius + 1}px;
  transition: background 0.3s, filter 0.3s ease-out;
  ${media.tablet`height: 100%;`};
  ${media.thone`
    grid-column: 1 / -1;
    opacity: 0.25;
  `};
  &:hover,
  &:focus {
    background: transparent;
    ${StyledFeaturedImg} {
      filter: none; // Remove the black and white filter on hover
    }
  }
`;
const StyledProjectContainer = styled.div`
  grid-column: 1 / -1;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  display: grid;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;
const StyledProject = styled.div`
  display: grid;
  min-width: 60vw;
  margin-right: 30px;
  margin-left: 30px;
  ${media.thone`
    margin-bottom: 70px;
    grid-template-columns: repeat(1, 1fr);
  `};
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Featured = ({ data }) => {
  const featuredProjects = data.filter(({ node }) => node);
  const revealTitle = useRef(null);

  return (
    <StyledContainer id="projects">
      <Heading ref={revealTitle}>
        <Dot>.</Dot>
        projects ()
      </Heading>
      <Swiper
        centeredSlides={true}
        slidesPerView={1}
        modules={[Pagination, Navigation]}
        autoplay
        spaceBetween={50}
        navigation
        loop
        pagination={{
          dynamicBullets: true,
        }}
      >
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover } = frontmatter;

            return (
              <StyledProject key={i}>
                <SwiperSlide>
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
                      <StyledFeaturedImg fluid={cover.childImageSharp.fluid} alt={title} />
                    </StyledImgContainer>
                  </StyledProjectContainer>
                </SwiperSlide>
              </StyledProject>
            );
          })}
      </Swiper>
    </StyledContainer>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Featured;
