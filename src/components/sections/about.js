'use client'

import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  position: relative;
`

const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`

const StyledContent = styled.div`
  width: 60%;
  max-width: 480px;
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
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
`

const StyledTechContainer = styled.div`
  margin-top: 2rem;
`

const StyledTechSection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: ${fontSizes.h3};
    margin-bottom: 1rem;
  }
`

const StyledTechList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  grid-gap: 0 10px;
  padding: 0;
  margin: 20px 0 0 0;
  overflow: hidden;
  list-style: none;

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
  const revealTitle = useRef(null)
  const revealContent = useRef(null)
  const revealPic = useRef(null)

  const renderContent = (item) => {
    if (typeof item === 'string') {
      return <p>{item}</p>
    }

    if (item.type === 'text') {
      return <p>{item.content}</p>
    }

    if (item.type === 'paragraph') {
      return (
        <p>
          {item.content.map((part, i) => {
            if (part.type === 'text') {
              return <span key={i}>{part.content}</span>
            }
            if (part.type === 'link') {
              return (
                <a key={i} href={part.url} target="_blank" rel="noopener noreferrer">
                  {part.content}
                </a>
              )
            }
            return null
          })}
        </p>
      )
    }

    if (item.type === 'list') {
      return (
        <ul>
          {item.items.map((listItem, i) => (
            <li key={i}>
              {typeof listItem === 'string' 
                ? listItem 
                : renderContent(listItem)}
            </li>
          ))}
        </ul>
      )
    }

    return null
  }

  return (
    <StyledContainer id="about">
      <Heading ref={revealTitle}>
        <Dot>.</Dot>{data.title}
      </Heading>

      <StyledFlexContainer>
        <StyledContent ref={revealContent}>
          {data.content && data.content.map((item, i) => (
            <React.Fragment key={i}>
              {renderContent(item)}
            </React.Fragment>
          ))}

          <StyledTechContainer>
            {technologiesData.map((section, i) => (
              <StyledTechSection key={i}>
                <h3>{section.title}</h3>
                <p>{section.content}</p>
                <StyledTechList>
                  {section.technologies.map((tech, j) => (
                    <li key={j}>{tech}</li>
                  ))}
                </StyledTechList>
              </StyledTechSection>
            ))}
          </StyledTechContainer>
        </StyledContent>

        {data.avatar && (
          <StyledPic ref={revealPic}>
            <img src={data.avatar} alt="Avatar" />
          </StyledPic>
        )}
      </StyledFlexContainer>
    </StyledContainer>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    content: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.shape({
              type: PropTypes.string.isRequired,
              content: PropTypes.string,
              url: PropTypes.string,
            })),
          ]),
          items: PropTypes.arrayOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.shape({
                type: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
              }),
            ])
          ),
        }),
      ])
    ).isRequired,
  }).isRequired,
  technologiesData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
}

export default About 