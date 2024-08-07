import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { theme, media } from '@styles';
const { colors } = theme;

const rotateY = keyframes`
  0%, 50%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(2vw);
  }
  75% {
    transform: translateY(2vw);
  }
`;

const rotateX = keyframes`
  0%, 50%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2vw);
  }
  75% {
    transform: translateY(-2vw);
  }
`;
const rotateYSmall = keyframes`
  0%, 50%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(4vw);
  }
  75% {
    transform: translateY(4vw);
  }
`;

const rotateXSmall = keyframes`
  0%, 50%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4vw);
  }
  75% {
    transform: translateY(-4vw);
  }
`;

const StyledLoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.bg};
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLoader = styled.div`
  position: relative;
  width: 10vw;
  height: 5vw;
  padding: 1.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDot = styled.span`
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${colors.green};
  &:nth-child(1) {
    animation: ${rotateY} 0.7s infinite linear;
  }
  &:nth-child(2) {
    animation: ${rotateX} 0.7s infinite linear;
  }
  ${media.phablet`
    height: 7px;
    width: 7px;
    &:nth-child(1) {
    animation: ${rotateYSmall} 0.7s infinite linear;
    }
    &:nth-child(2) {
      animation: ${rotateXSmall} 0.7s infinite linear;
    }
  `};
`;

const Loader = ({ finishLoading }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      finishLoading();
    }, 1000); // Set this to the desired loader display duration
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <StyledLoaderContainer className="loader-div">
      <StyledLoader>
        <StyledDot />
        <StyledDot />
      </StyledLoader>
    </StyledLoaderContainer>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
