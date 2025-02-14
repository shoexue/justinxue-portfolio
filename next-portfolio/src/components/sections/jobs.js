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
  max-width: 700px;
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
    padding-left: 50px;
    padding-bottom: 15px;
  `};
  ${media.phablet`
    width: calc(100% + 50px);
    margin-left: -25px;
    padding-left: 25px;
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
  font-size: ${fontSizes.smish};
  color: ${props => (props.$isActive ? colors.green : colors.lightSlate)};
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
const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: ${theme.tabHeight}px;
  border-radius: ${theme.borderRadius};
  background: ${colors.green};
  transform: translateY(
    ${props => (props.$activeTabId > 0 ? props.$activeTabId * theme.tabHeight : 0)}px
  );
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;
  ${media.thone`
    width: 100%;
    max-width: ${theme.tabWidth}px;
    height: 2px;
    top: auto;
    bottom: 0;
    transform: translateX(
      ${props => (props.$activeTabId > 0 ? props.$activeTabId * theme.tabWidth : 0)}px
    );
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

  ul {
    ${mixins.fancyList};
  }
  a {
    ${mixins.inlineLink};
  }
`
const StyledJobTitle = styled.h4`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xxl};
  font-weight: 500;
  margin-bottom: 5px;
`
const StyledCompany = styled.span`
  color: ${colors.green};
`
const StyledJobDetails = styled.h5`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  font-weight: normal;
  letter-spacing: 0.05em;
  color: ${colors.lightSlate};
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
  const [isMounted, setIsMounted] = useState(false)
  const [tabFocus, setTabFocus] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', content: '' })
  const tabs = useRef([])
  const revealContainer = useRef(null)
  const sr = useScrollReveal()
  const jobsRef = useRef(null)
  
  // Add refs for CSSTransition
  const nodeRefs = useRef(data ? data.map(() => React.createRef()) : [])

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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus()
      return
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0)
    }
    // If we're at the start, go to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1)
    }
  }

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus])

  const handleModalClose = () => {
    setIsModalOpen(false)
    setModalContent({ title: '', content: '' })
  }

  const handleModalOpen = (title, content) => {
    setModalContent({ title, content })
    setIsModalOpen(true)
  }

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault()
        setTabFocus(tabFocus - 1)
        break
      }

      case 'ArrowDown': {
        e.preventDefault()
        setTabFocus(tabFocus + 1)
        break
      }

      default: {
        break
      }
    }
  }

  return (
    <StyledContainer id="jobs" ref={revealContainer}>
      <Heading>
        <Dot>.</Dot>Where I've Worked
      </Heading>
      <StyledTabs>
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={onKeyDown}>
          {data &&
            data.map(({ frontmatter }, i) => {
              const { company } = frontmatter
              tabs.current[i] = tabs.current[i] || React.createRef()

              return (
                <li key={i}>
                  <StyledTabButton
                    $isActive={activeTabId === i}
                    onClick={() => setActiveTabId(i)}
                    ref={tabs.current[i]}
                    id={`tab-${i}`}
                    role="tab"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-selected={activeTabId === i}
                    aria-controls={`panel-${i}`}>
                    <span>{company}</span>
                  </StyledTabButton>
                </li>
              )
            })}
          <StyledHighlight $activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabContent>
          <TransitionGroup component={null}>
            {data &&
              data.map(({ frontmatter, html }, i) => {
                const { title, url, company, range, blog } = frontmatter
                return (
                  <CSSTransition
                    key={i}
                    in={activeTabId === i}
                    timeout={250}
                    classNames="fade"
                    nodeRef={nodeRefs.current[i]}
                    unmountOnExit>
                    <div
                      ref={nodeRefs.current[i]}
                      id={`panel-${i}`}
                      role="tabpanel"
                      tabIndex={activeTabId === i ? '0' : '-1'}
                      aria-labelledby={`tab-${i}`}
                      aria-hidden={activeTabId !== i}
                      hidden={activeTabId !== i}>
                      <StyledJobTitle>
                        <span>{title}</span>
                        <StyledCompany>
                          <span>&nbsp;@&nbsp;</span>
                          <a href={url} target="_blank" rel="nofollow noopener noreferrer">
                            {company}
                          </a>
                        </StyledCompany>
                      </StyledJobTitle>
                      <StyledJobDetails>
                        <span>{range}</span>
                      </StyledJobDetails>
                      <div dangerouslySetInnerHTML={{ __html: html }} />
                      {blog && (
                        <StyledBlogButton onClick={() => handleModalOpen(title, blog)}>
                          Read More
                        </StyledBlogButton>
                      )}
                    </div>
                  </CSSTransition>
                )
              })}
          </TransitionGroup>
        </StyledTabContent>
      </StyledTabs>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalContent.title}
        content={modalContent.content}
      />
    </StyledContainer>
  )
}

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Jobs 