import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading, Dot } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;
`;
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
// const StyledGridBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   overflow-x: auto;
//   align-items: center;
//   justify-contents: center;
// `;
// const StyledScrollingWrapper = styled.div`
//   display: flex;
//   overflow-x: auto;
//   width: 100%;
//   -webkit-overflow-scrolling: touch;
//   scroll-snap-type: x mandatory;
//   scroll-behavior: smooth;
//   &::-webkit-scrollbar {
//     display: none; // Optionally hide the scrollbar
//   }
// `;

const Featured = ({ data }) => {
  const featuredProjects = data.filter(({ node }) => node);
  const revealTitle = useRef(null);
  // const scrollingRef = useRef(null);
  // const [isPaused, setIsPaused] = useState(false);

  // const scrollContainer = () => {
  //   if (!isPaused && scrollingRef.current) {
  //     scrollingRef.current.scrollLeft += 1;
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(scrollContainer, 20); // Adjust speed as needed
  //   return () => clearInterval(interval);
  // }, [isPaused]);

  // useEffect(() => {
  //   const handleMouseOver = () => setIsPaused(true);
  //   const handleMouseOut = () => setIsPaused(false);

  //   const scrollDiv = scrollingRef.current;
  //   if (scrollDiv) {
  //     scrollDiv.addEventListener('mouseover', handleMouseOver);
  //     scrollDiv.addEventListener('mouseout', handleMouseOut);
  //   }

  //   return () => {
  //     if (scrollDiv) {
  //       scrollDiv.removeEventListener('mouseover', handleMouseOver);
  //       scrollDiv.removeEventListener('mouseout', handleMouseOut);
  //     }
  //   };
  // }, []);

  return (
    <StyledContainer id="projects">
      <Heading ref={revealTitle}>
        <Dot>.</Dot>
        projects ()
      </Heading>
      {/* <StyledScrollingWrapper> */}
      {/* <StyledGridBox> */}
      <Swiper
        centeredSlides={true}
        slidesPerView={3}
        // modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        navigation
        loop
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
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
      {/* </StyledGridBox> */}
      {/* </StyledScrollingWrapper> */}
    </StyledContainer>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Featured;
