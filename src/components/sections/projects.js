'use client'

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import useScrollReveal from '../../utils/sr'
import { FormattedIcon } from '../icons'
import styled from 'styled-components'
import { theme, mixins, media, Section } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`
const StyledTitle = styled.h4`
  margin: 0 auto;
  font-size: ${fontSizes.h3};
  color: ${colors.slate};
  ${media.tablet`font-size: 24px;`};
  a {
    display: block;
  }
`
const StyledSubtext = styled.p`
  margin: 0 auto;
  font-size: ${fontSizes.sm};
  margin-top: 5px;
  font-family: ${fonts.SFMono};
  color: ${colors.slate};
  ${media.tablet`font-size: 24px;`};
  a {
    display: block;
  }
`
const StyledGrid = styled.div`
  margin-top: 50px;

  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));`};
  }
`
const StyledProjectInner = styled.div`
  ${mixins.boxShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2rem 1.75rem;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: ${colors.lightGray};
`
const StyledProject = styled.div`
  transition: ${theme.transition};
  cursor: default;
  &:hover,
  &:focus {
    outline: 0;
    ${StyledProjectInner} {
      transform: translateY(-5px);
    }
  }
`
const StyledProjectHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`
const StyledFolder = styled.div`
  color: ${colors.green};
  svg {
    width: 40px;
    height: 40px;
  }
`
const StyledProjectLinks = styled.div`
  margin-right: -10px;
  color: ${colors.lightSlate};
`
const StyledIconLink = styled.a`
  position: relative;
  top: -10px;
  padding: 10px;
  color: ${colors.lightSlate};
  svg {
    width: 20px;
    height: 20px;
  }
  &:hover,
  &:focus {
    color: ${colors.green};
  }
`
const StyledProjectName = styled.h5`
  margin: 0 0 10px;
  font-size: ${fontSizes.xxl};
  color: ${colors.lightestSlate};
`
const StyledProjectDescription = styled.div`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  color: ${colors.lightSlate};
  line-height: 1.5;

  * {
    font-family: ${fonts.SFMono} !important;
  }

  p {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
    margin-bottom: 15px;
  }

  a {
    ${mixins.inlineLink};
    font-family: ${fonts.SFMono};
  }
`
const StyledTechList = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.xs};
    color: ${colors.green};
    line-height: 1.75;
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`

const Projects = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false)
  const revealTitle = useRef(null)
  const revealArchiveLink = useRef(null)
  const revealProjects = useRef([])
  const nodeRefs = useRef([])
  const sr = useScrollReveal()

  useEffect(() => {
    // Initialize nodeRefs for each project
    nodeRefs.current = data ? data.map(() => React.createRef()) : []
    setIsMounted(true)
    
    if (sr && revealTitle.current) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
      sr.reveal(revealArchiveLink.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        viewFactor: 0.25,
      })
      revealProjects.current.forEach((ref, i) => {
        if (ref) {
          sr.reveal(ref, {
            duration: 500,
            distance: '20px',
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
            origin: 'bottom',
            viewFactor: 0.25,
            delay: i * 100,
          })
        }
      })
    }
  }, [sr, data])

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <div>{content}</div>
    }

    if (content.type === 'text') {
      return (
        <div>
          {content.content}
          {content.link && (
            <a href={content.link.url} target="_blank" rel="noopener noreferrer">
              {content.link.text}
            </a>
          )}
          {content.afterLink}
        </div>
      )
    }

    return null
  }

  const archiveText = `// archives`
  const descriptionText = `// just some more of my projects`

  return (
    <StyledContainer id="projects">
      <StyledTitle ref={revealTitle}>{archiveText}</StyledTitle>
      <StyledSubtext ref={revealTitle}>{descriptionText}</StyledSubtext>
      <StyledGrid>
        <TransitionGroup className="projects">
          {isMounted &&
            data &&
            data.map(({ title, github, external, tech, content }, i) => (
              <CSSTransition
                key={i}
                classNames="fadeup"
                timeout={300}
                nodeRef={nodeRefs.current[i]}
                exit={false}>
                <StyledProject
                  key={i}
                  ref={nodeRefs.current[i]}
                  tabIndex="0"
                  style={{
                    transitionDelay: `${i * 100}ms`,
                  }}>
                  <StyledProjectInner>
                    <header>
                      <StyledProjectHeader>
                        <StyledFolder>
                          <FormattedIcon name="Folder" />
                        </StyledFolder>
                        <StyledProjectLinks>
                          {github && (
                            <StyledIconLink
                              href={github}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              aria-label="GitHub Link">
                              <FormattedIcon name="GitHub" />
                            </StyledIconLink>
                          )}
                          {external && (
                            <StyledIconLink
                              href={external}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              aria-label="External Link">
                              <FormattedIcon name="External" />
                            </StyledIconLink>
                          )}
                        </StyledProjectLinks>
                      </StyledProjectHeader>
                      <StyledProjectName>{title}</StyledProjectName>
                      <StyledProjectDescription>
                        {renderContent(content)}
                      </StyledProjectDescription>
                    </header>
                    <footer>
                      {tech && (
                        <StyledTechList>
                          {tech.map((tech, i) => (
                            <li key={i}>{tech}</li>
                          ))}
                        </StyledTechList>
                      )}
                    </footer>
                  </StyledProjectInner>
                </StyledProject>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </StyledGrid>
    </StyledContainer>
  )
}

Projects.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      github: PropTypes.string,
      external: PropTypes.string,
      tech: PropTypes.arrayOf(PropTypes.string).isRequired,
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          link: PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          }),
          afterLink: PropTypes.string,
        }),
      ]).isRequired,
    })
  ).isRequired,
}

export default Projects 