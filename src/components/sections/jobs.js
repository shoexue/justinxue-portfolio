'use client'

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
import GalleryModal from '../GalleryModal'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 1000px;
`
const StyledTabs = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  ${media.thone`
    display: block;
  `};
`
const StyledTabList = styled.ul`
  display: block;
  position: relative;
  width: max-content;
  z-index: 3;
  padding: 0;
  margin: 0;
  list-style: none;

  ${media.thone`
    display: flex;
    overflow-x: scroll;
    margin-bottom: 30px;
    width: calc(100% + 100px);
    margin-left: -50px;
  `};
  ${media.phablet`
    width: calc(100% + 50px);
    margin-left: -25px;
  `};

  li {
    &:first-of-type {
      ${media.thone`
        margin-left: 50px;
      `};
      ${media.phablet`
        margin-left: 25px;
      `};
    }
    &:last-of-type {
      ${media.thone`
        padding-right: 50px;
      `};
      ${media.phablet`
        padding-right: 25px;
      `};
    }
  }
`
const StyledTabButton = styled.button`
  ${mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  background-color: transparent;
  height: ${theme.tabHeight}px;
  padding: 0 20px 2px;
  transition: ${theme.transition};
  border-left: 2px solid ${colors.lightestGray};
  text-align: left;
  white-space: nowrap;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  color: ${props => (props.$isActive ? colors.green : colors.slate)};
  ${media.tablet`padding: 0 15px 2px;`};
  ${media.thone`
    ${mixins.flexCenter};
    padding: 0 15px;
    text-align: center;
    border-left: 0;
    border-bottom: 2px solid ${colors.lightestGray};
    min-width: 120px;
  `};
  &:hover,
  &:focus {
    background-color: ${colors.lightGray};
  }
`
const StyledHighlight = styled.span`
  display: block;
  background: ${colors.green};
  width: 2px;
  height: ${theme.tabHeight}px;
  border-radius: ${theme.borderRadius};
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;
  z-index: 10;
  transform: translateY(
    ${props => (props.$activeTabId > 0 ? props.$activeTabId * theme.tabHeight : 0)}px
  );
  ${media.thone`
    width: 100%;
    max-width: ${theme.tabWidth}px;
    height: 2px;
    top: auto;
    bottom: 0;
    transform: translateX(
      ${props => (props.$activeTabId > 0 ? props.$activeTabId * theme.tabWidth : 0)}px
    );
    margin-left: 50px;
  `};
  ${media.phablet`
    margin-left: 25px;
  `};
`
const StyledTabContent = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 12px;
  padding-left: 30px;
  ${media.tablet`padding-left: 20px;`};
  ${media.thone`padding-left: 0;`};
  display: ${props => (props.$isActive ? 'block' : 'none')};
  opacity: ${props => (props.$isActive ? 1 : 0)};
  transform: translateY(${props => (props.$isActive ? '0' : '20px')});
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  * {
    font-family: ${fonts.SFMono} !important;
  }

  ul {
    ${mixins.fancyList};
    font-size: ${fontSizes.smish};
    margin-left: 0;
    padding-left: 0;
    list-style: none;
  }

  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
    font-family: ${fonts.SFMono} !important;
    font-size: ${fontSizes.sm};
    color: ${colors.slate};

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${colors.green};
    }
  }

  a {
    ${mixins.inlineLink};
    font-family: ${fonts.SFMono} !important;
    font-size: ${fontSizes.sm};
  }

  div {
    font-family: ${fonts.SFMono} !important;
    font-size: ${fontSizes.sm};
    color: ${colors.slate};
  }
`

const StyledRole = styled.div`
  margin-bottom: 35px;
  position: relative;
  padding-left: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: ${props => props.$isFirstRole ? '10px' : '0'};
    height: ${props => props.$isFirstRole ? 'calc(100% - 10px)' : '100%'};
    width: 2px;
    background-color: ${colors.green};
    opacity: 0.3;
  }

  &:after {
    content: '';
    position: absolute;
    left: -4px;
    top: 10px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${colors.green};
    opacity: 0.8;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    &:before {
      opacity: 0.5;
    }
    &:after {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  // Connect to the next role if it exists
  &:not(:last-child) {
    &:before {
      height: calc(100% + 35px); // Extend to the next role
    }
  }
`

const StyledJobTitle = styled.h4`
  color: ${colors.lightestSlate};
  font-family: ${fonts.Calibre} !important;
  font-size: ${fontSizes.xxl};
  font-weight: 600;
  margin-bottom: 5px;
  transition: color 0.25s ease-in-out;

  &:hover {
    color: ${colors.green};
  }
`

const StyledCompany = styled.h6`
  color: ${colors.green};
  font-family: ${fonts.Calibre} !important;
  font-size: ${fontSizes.lg};
  font-weight: 600;
  margin-bottom: 5px;
  opacity: 0.9;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 1;
  }
`

const StyledJobDetails = styled.h5`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  font-weight: normal;
  letter-spacing: 0.05em;
  color: ${colors.lightSlate};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  span.divider {
    color: ${colors.green};
    opacity: 0.7;
  }
`

const StyledList = styled.ul`
  position: relative;
  padding-left: 0;
  margin-left: 0;
  
  li {
    position: relative;
    padding-left: 25px;
    margin-bottom: 10px;
    font-size: ${fontSizes.sm};
    color: ${colors.slate};
    transition: transform 0.2s ease-in-out;

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${colors.green};
      opacity: 0.8;
      transition: all 0.2s ease-in-out;
    }

    &:hover {
      transform: translateX(5px);
      color: ${colors.lightestSlate};

      &:before {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }
`

const GalleryButton = styled.button`
  ${mixins.inlineLink};
  margin-top: 20px;
  margin-left: 5px;
  font-size: ${fontSizes.smish};
  background-color: transparent;
  color: ${colors.green};
  padding: 10px 15px;
  
  ${media.thone`
    padding: 8px 12px;
    font-size: ${fontSizes.xs};
  `};
`

const Jobs = ({ data }) => {
  const [activeTabId, setActiveTabId] = useState(0)
  const [tabFocus, setTabFocus] = useState(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const tabs = useRef([])
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

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus()
    } else {
      // If we're at the end, go to the start
      if (tabFocus >= tabs.current.length) {
        setTabFocus(0)
      }
      // If we're at the start, move to the end
      if (tabFocus < 0) {
        setTabFocus(tabs.current.length - 1)
      }
    }
  }

  useEffect(() => focusTab(), [tabFocus])

  const onKeyPressed = e => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault()
      if (e.keyCode === 40) {
        // Move down
        setTabFocus(tabFocus + 1)
      } else if (e.keyCode === 38) {
        // Move up
        setTabFocus(tabFocus - 1)
      }
    }
  }

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

  return (
    <StyledContainer id="jobs" ref={revealContainer}>
      <Heading>
        <Dot>.</Dot>experiences ()
      </Heading>

      <StyledTabs>
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyPressed(e)}>
          {data.map(({ company }, i) => (
            <li key={i}>
              <StyledTabButton
                $isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                ref={el => (tabs.current[i] = el)}
                id={`tab-${i}`}
                role="tab"
                aria-selected={activeTabId === i ? 'true' : 'false'}
                aria-controls={`panel-${i}`}
                tabIndex={activeTabId === i ? '0' : '-1'}>
                <span>{company}</span>
              </StyledTabButton>
            </li>
          ))}
          <StyledHighlight $activeTabId={activeTabId} />
        </StyledTabList>

        <div>
          {data.map(({ company, roles }, i) => (
            <StyledTabContent
              key={i}
              $isActive={activeTabId === i}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              tabIndex={activeTabId === i ? '0' : '-1'}>
              {roles.map((role, j) => (
                <StyledRole 
                  key={j} 
                  $isFirstRole={j === 0}>
                  <StyledJobTitle>{role.title}</StyledJobTitle>
                  <StyledCompany>{company}</StyledCompany>
                  <StyledJobDetails>
                    <span>{role.range}</span>
                    <span className="divider">•</span>
                    <span>{role.location}</span>
                  </StyledJobDetails>
                  <StyledList>
                    {role.content.map((item, k) => (
                      <li key={k}>{renderContent(item)}</li>
                    ))}
                  </StyledList>
                  {company === 'UTMIST & Lovelytics' && (
                    <GalleryButton onClick={() => setGalleryOpen(true)}>
                      View Project Gallery
                    </GalleryButton>
                  )}
                </StyledRole>
              ))}
            </StyledTabContent>
          ))}
        </div>
      </StyledTabs>
      
      <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </StyledContainer>
  )
}

Jobs.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          location: PropTypes.string.isRequired,
          range: PropTypes.string.isRequired,
          content: PropTypes.arrayOf(
            PropTypes.oneOfType([
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
            ])
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default Jobs 