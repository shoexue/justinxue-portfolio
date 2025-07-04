"use client"
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, media, Section, FractalTreeContainer } from "@/styles"
import { FractalTree } from '@/components';
import useScrollReveal from '../../utils/sr';
const { colors, fontSizes, fonts, navDelay } = theme;

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
const StyledCVButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  background: ${colors.green};
  color: #000;
  border-radius: 5px;
  font-size: 1.2rem;
  text-decoration: none;
  font-family: ${fonts.SFMono};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${colors.lightGreen || '#baffc9'};
    color: #fff;
  }
  &:active,
  &:focus,
  &:visited {
    color: #000;
  }
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const sr = useScrollReveal();

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (sr && containerRef.current) {
      sr.reveal(containerRef.current.children, {
        duration: 1000,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        interval: 100
      });
    }
  }, [sr, isMounted]);

  const { title, name, subtitle } = data;

  const items = [
    {
      node: <StyledOverline>{title}</StyledOverline>,
      delay: '100ms'
    },
    {
      node: <StyledTitle>{name}</StyledTitle>,
      delay: '200ms'
    },
    {
      node: <StyledSubtitle>{subtitle}</StyledSubtitle>,
      delay: '300ms'
    },
    {
      node: (
        <StyledCVButton href="/JustinXueResume_July2025.pdf" target="_blank" rel="noopener noreferrer">
          Download CV
        </StyledCVButton>
      ),
      delay: '400ms'
    }
  ];

  return (
    <StyledContainer ref={containerRef}>
      {isMounted && (
        <>
          <div>
            {items.map(({ node }, i) => (
              <div key={i}>
                {node}
              </div>
            ))}
          </div>
        </>
      )}
    </StyledContainer>
  );
};

Hero.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default Hero;
