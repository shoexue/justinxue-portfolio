"use client"
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { theme, mixins, media, Section, FractalTreeContainer } from "@/styles"
import { FractalTree } from '@/components';
const { colors, fontSizes, fonts, navDelay, loaderDelay } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`;
const StyledOverline = styled.h1`
  color: ${colors.green};
  margin: 0 0 20px 3px;
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`;
const StyledTitle = styled.h2`
  font-size: 80px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledSubtitle = styled.h3`
  font-size: 80px;
  line-height: 1.1;
  color: ${colors.slate};
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledDescription = styled.div`
  margin-top: 25px;
  margin-bottom: 5px;
  width: 50%;
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const { frontmatter, html } = data[0];

  const items = [
    {
      node: <StyledOverline>{frontmatter.title}</StyledOverline>,
      delay: '100ms'
    },
    {
      node: <StyledTitle>{frontmatter.name}</StyledTitle>,
      delay: '200ms'
    },
    {
      node: <StyledSubtitle>{frontmatter.subtitle}</StyledSubtitle>,
      delay: '300ms'
    },
    {
      node: <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />,
      delay: '400ms'
    }
  ];

  return (
    <StyledContainer ref={containerRef}>
      {isMounted && (
        <>
          <div>
            {items.map(({ node, delay }, i) => (
              <div key={i} style={{ 
                transitionDelay: delay,
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeup 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) forwards',
                animationDelay: delay
              }}>
                {node}
              </div>
            ))}
          </div>
          <div style={{ 
            transitionDelay: '500ms',
            opacity: 0,
            animation: 'fadeup 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) forwards',
            animationDelay: '500ms',
            width: '100%'
          }}>
            <FractalTreeContainer>
              <FractalTree />
            </FractalTreeContainer>
          </div>
        </>
      )}
    </StyledContainer>
  );
};

Hero.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Hero;
