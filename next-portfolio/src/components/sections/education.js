'use client'

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useScrollReveal from '../../utils/sr'
// import { FormattedIcon } from '../icons'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 800px;
`

const StyledTimeline = styled.div`
  position: relative;
  padding-left: 30px;
  margin-left: 10px;
  border-left: 2px solid ${colors.green};

  &:before {
    content: '';
    position: absolute;
    left: -7px;
    top: 0;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: ${colors.green};
  }

  &:after {
    content: '';
    position: absolute;
    left: -7px;
    bottom: 0;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: ${colors.green};
  }
`

const StyledContent = styled.div`
  position: relative;
  margin-bottom: 50px;
  padding: 25px;
  border-radius: ${theme.borderRadius};
  background-color: transparent;
  border: 3px solid ${colors.lightGray};
  transition: ${theme.transition};
  ${mixins.boxShadow};
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledDate = styled.div`
  margin-bottom: 10px;
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
`

const StyledSchool = styled.h4`
  margin-bottom: 5px;
  font-size: ${fontSizes.xxl};
  font-weight: 600;
  color: ${colors.lightestSlate};
`

const StyledDegree = styled.h5`
  margin-bottom: 20px;
  font-size: ${fontSizes.lg};
  font-weight: normal;
  color: ${colors.green};
`

const StyledDescription = styled.div`
  font-size: ${fontSizes.sm};
  font-family: ${fonts.SFMono};
  color: ${colors.lightSlate};
  
  a {
    ${mixins.inlineLink};
  }

  ul {
    ${mixins.fancyList};
  }

  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
    font-size: ${fontSizes.sm};
    
    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${colors.green};
    }
  }
`

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.slate};
    margin-right: 20px;
    margin-bottom: 7px;
    white-space: nowrap;
    &:last-of-type {
      margin-right: 0;
    }
    &:before {
      content: '▹';
      color: ${colors.green};
      margin-right: 8px;
    }
  }
`

const StyledLocationIcon = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  color: ${colors.green};
  svg {
    width: 20px;
    height: 20px;
  }
`

const Education = ({ data }) => {
  const revealTitle = useRef(null)
  const revealEducation = useRef([])
  const sr = useScrollReveal()

  useEffect(() => {
    if (sr && revealTitle.current) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
      
      revealEducation.current.forEach((ref, i) => {
        if (ref) {
          sr.reveal(ref, {
            duration: 1000,
            distance: '40px',
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
            origin: 'bottom',
            viewFactor: 0.2,
            delay: i * 200,
            beforeReveal: (el) => {
              el.classList.add('visible');
            },
          })
        }
      })
    }
  }, [sr])

  return (
    <StyledContainer id="education">
      <Heading ref={revealTitle}>
        <Dot>.</Dot>education ()
      </Heading>

      <StyledTimeline>
        {data &&
          data.map(({ frontmatter, html }, i) => {
            const { title, school, range, location } = frontmatter
            return (
              <StyledContent 
                key={i} 
                ref={el => (revealEducation.current[i] = el)}
                style={{ 
                  transitionDelay: `${i * 100}ms`
                }}
              >
                <StyledDate>{range}</StyledDate>
                <StyledSchool>{school}</StyledSchool>
                <StyledDegree>{title}</StyledDegree>
                <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
                {/* {location && (
                  <StyledLocationIcon>
                    <FormattedIcon name="Location" />
                  </StyledLocationIcon>
                )} */}
              </StyledContent>
            )
          })}
      </StyledTimeline>
    </StyledContainer>
  )
}

Education.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Education 