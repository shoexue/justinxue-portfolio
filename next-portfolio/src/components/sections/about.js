'use client'

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  position: relative;
`
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  margin-bottom: 15%;
  ${media.tablet`display: block;`};
`
const StyledContent = styled.div`
  width: 60%;
  height: 100%;
  align-items: flex;
  max-width: 480px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.md};
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`
const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 300px;
  margin-left: 60px;
  margin-bottom: 10px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`
const StyledAvatar = styled.div`
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius};
  }
`

const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: ${colors.lightestSlate};
  margin-left: -20px;
  &:hover ${StyledAvatar}, &:focus ${StyledAvatar} {
    filter: none;
  }
`

const TechnologyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
`

const TechnologyItem = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;

  h4 {
    color: ${colors.green};
    font-size: ${fontSizes.lg};
    font-weight: 500;
    margin-bottom: 20px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    gap: 0px 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
  }

  div {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.slate};
  }

  li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 20px;
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.slate};

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${colors.green};
      font-size: ${fontSizes.sm};
      line-height: 12px;
    }
  }
`

const About = ({ data, technologiesData }) => {
  const { frontmatter, html } = data[0]
  const { title, avatar } = frontmatter
  const revealContainer = useRef(null)
  const revealTitle = useRef(null)
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
    if (sr && revealTitle.current) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
    }
  }, [sr])

  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Heading ref={revealTitle}>
        <Dot>.</Dot>about ()
      </Heading>
      <StyledFlexContainer>
        <StyledContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </StyledContent>
        <StyledPic>
          <StyledAvatarLink href="https://github.com/alvina-yang" target="_blank" rel="noopener noreferrer">
            <StyledAvatar>
              <Image
                src={`/${avatar}`}
                alt="Avatar"
                width={300}
                height={300}
                quality={95}
                priority
              />
            </StyledAvatar>
          </StyledAvatarLink>
        </StyledPic>
      </StyledFlexContainer>
      <Heading>
        here's my tech stack!
      </Heading>
      <TechnologyContainer>
        {technologiesData.map(({ frontmatter, html }, i) => (
          <TechnologyItem key={i}>
            <h4>{frontmatter.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <ul>
              {frontmatter.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </TechnologyItem>
        ))}
      </TechnologyContainer>
    </StyledContainer>
  )
}

About.propTypes = {
  data: PropTypes.array.isRequired,
  technologiesData: PropTypes.array.isRequired,
}

export default About 