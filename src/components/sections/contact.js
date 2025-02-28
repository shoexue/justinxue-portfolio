'use client'

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 100px;
  a {
    ${mixins.inlineLink};
  }
`

const StyledDescription = styled.div`
  margin-bottom: 50px;

  p {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.md};
    color: ${colors.slate};
    margin: 0;
  }
`

const StyledHeading = styled(Heading)`
  display: block;
  color: ${colors.green};
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  margin-bottom: 20px;
  justify-content: center;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  &:before {
    bottom: 0;
    font-size: ${fontSizes.sm};
    ${media.desktop`font-size: ${fontSizes.smish};`};
  }
  &:after {
    display: none;
  }
`
const StyledTitle = styled.h4`
  margin: 0 0 20px;
  font-size: 60px;
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
`
const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  margin-top: 50px;
  font-size: ${fontSizes.md} !important;
`

const Contact = ({ data }) => {
  const { title, buttonText, content } = data
  const revealContainer = useRef(null)
  const sr = useScrollReveal()

  useEffect(() => {
    if (sr && revealContainer.current) {
      sr.reveal(revealContainer.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        viewFactor: 0.25,
      })
    }
  }, [sr])

  return (
    <StyledContainer id="contact" ref={revealContainer}>
      <StyledHeading>well, what now?</StyledHeading>

      <StyledTitle>
        <Dot>.</Dot>
        {title}
      </StyledTitle>

      <StyledDescription>
        <p>{content}</p>
      </StyledDescription>

      <StyledEmailLink href="mailto:alvina.yang@mail.utoronto.ca" target="_blank" rel="nofollow noopener noreferrer">
        {buttonText}
      </StyledEmailLink>
      <div />
      {/* <StyledResumeLink href="/resume.pdf" target="_blank" rel="nofollow noopener noreferrer">
        little souvenir? download my resume
      </StyledResumeLink> */}
    </StyledContainer>
  )
}

Contact.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default Contact 