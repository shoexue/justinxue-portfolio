import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import 'swiper/swiper-bundle.min.css';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors } = theme;
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
const StyledBookName = styled.h5`
  font-size: 28px;
  margin: 0 0 20px;
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: 24px;`};
  ${media.thone`color: ${colors.white};`};
  a {
    ${media.tablet`display: block;`};
  }
`;
// const StyledDescription = styled.div`
//   ${mixins.boxShadow};
//   position: relative;
//   z-index: 2;
//   padding: 25px;
//   background-color: ${colors.lightGray};
//   color: ${colors.lightSlate};
//   font-size: ${fontSizes.lg};
//   border-radius: ${theme.borderRadius};
//   ${media.thone`
//     background-color: transparent;
//     padding: 20px 0;
//     box-shadow: none;
//     &:hover {
//       box-shadow: none;
//     }
//   `};
//   p {
//     margin: 0;
//     font-family: ${fonts.SFMono};
//     font-size: ${fontSizes.sm};
//     max-width: 70vw;
//   }
//   a {
//     ${mixins.inlineLink};
//   }
// `;
const StyledBooksImg = styled(Img)`
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
    ${StyledBooksImg} {
      filter: none; // Remove the black and white filter on hover
    }
  }
`;
const StyledBookContainer = styled.div`
  grid-column: 1 / -1;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  display: grid;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;
const StyledBook = styled.div`
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

const Books = ({ data }) => {
  const featuredBooks = data.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const headingTitle = `Some of my favourite books :)`;
  return (
    <StyledContainer>
      <Heading ref={revealTitle}>{headingTitle}</Heading>
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
        {featuredBooks &&
          featuredBooks.map(({ node }, i) => {
            const { frontmatter } = node;
            const { name, author, cover } = frontmatter;

            return (
              <StyledBook key={i}>
                <SwiperSlide>
                  <StyledBookContainer>
                    <StyledContent>
                      <StyledBookName>{name}</StyledBookName>
                      <StyledBookName>{author}</StyledBookName>
                    </StyledContent>
                    <StyledImgContainer>
                      <StyledBooksImg fluid={cover} alt={cover} />
                    </StyledImgContainer>
                  </StyledBookContainer>
                </SwiperSlide>
              </StyledBook>
            );
          })}
      </Swiper>
    </StyledContainer>
  );
};

Books.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Books;
