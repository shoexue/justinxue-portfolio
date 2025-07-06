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
  min-height: 80vh;
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
  margin-left: 1rem;
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
`;

const StyledMonkeyTypeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: ${colors.green};
  border: 1px solid ${colors.green};
  border-radius: 5px;
  font-size: 1rem;
  text-decoration: none;
  font-family: ${fonts.SFMono};
  transition: all 0.2s;
  &:hover {
    background: ${colors.transGreen};
    color: ${colors.white};
  }
  &:active,
  &:focus,
  &:visited {
    color: ${colors.green};
  }
`;

const MonkeyTypeLogo = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
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
        <div>
          <StyledCVButton href="/JustinXueResume_July2025.pdf" target="_blank" rel="noopener noreferrer">
            Download CV
          </StyledCVButton>
          <StyledMonkeyTypeButton href="https://monkeytype.com/profile/shoexue" target="_blank" rel="noopener noreferrer">
            <MonkeyTypeLogo viewBox="0 0 24 24">
              <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
            </MonkeyTypeLogo>
            200+ WPM on monkeytype
          </StyledMonkeyTypeButton>
        </div>
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
