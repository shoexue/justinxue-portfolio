'use client'

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
import { Modal } from '..'
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
const StyledJobTitle = styled.h4`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xxl};
  font-weight: 600;
  margin-bottom: 5px;
`
const StyledCompany = styled.h6`
  color: ${colors.green};
  font-size: ${fontSizes.lg};
  font-weight: 500;
  margin-bottom: 5px;
`
const StyledJobDetails = styled.h5`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  font-weight: normal;
  letter-spacing: 0.05em;
  color: ${colors.lightestSlate};
  margin-bottom: 30px;
  svg {
    width: 15px;
  }
`

const StyledBlogButton = styled.button`
  color: ${colors.green};
  background-color: transparent;
  border: none;
  padding: 0;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: ${theme.transition};
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: auto;

  &:after {
    content: '→';
    display: inline-block;
    margin-left: 8px;
    transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &:hover,
  &:focus,
  &:active {
    color: ${colors.green};
    outline: none;
    
    &:after {
      transform: translateX(6px);
    }
  }
`

const Jobs = ({ data }) => {
  const [activeTabId, setActiveTabId] = useState(0)
  const [tabFocus, setTabFocus] = useState(null)
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
        <Dot>.</Dot>experience ()
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
          {data.map(({ title, company, range, location, content }, i) => (
            <StyledTabContent
              key={i}
              $isActive={activeTabId === i}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              tabIndex={activeTabId === i ? '0' : '-1'}>
              <StyledJobTitle>{title}</StyledJobTitle>
              <StyledCompany>{company}</StyledCompany>
              <StyledJobDetails>
                <span>{range}</span>
                <span>&nbsp;@&nbsp;</span>
                <span>{location}</span>
              </StyledJobDetails>
              <ul>
                {content.map((item, j) => (
                  <li key={j}>{renderContent(item)}</li>
                ))}
              </ul>
            </StyledTabContent>
          ))}
        </div>
      </StyledTabs>
    </StyledContainer>
  )
}

Jobs.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
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
}

export default Jobs 