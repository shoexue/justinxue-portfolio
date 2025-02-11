import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading, Dot } from '@styles';
import { Modal } from '@components';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 800px;
`;
const StyledTabs = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  ${media.thone`
    display: block;
  `};
`;
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
`;
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
  color: ${props => (props.isActive ? colors.green : colors.slate)};
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
`;
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
    ${props => (props.activeTabId > 0 ? props.activeTabId * theme.tabHeight : 0)}px
  );
  ${media.thone`
    width: 100%;
    max-width: ${theme.tabWidth}px;
    height: 2px;
    top: auto;
    bottom: 0;
    transform: translateX(
      ${props => (props.activeTabId > 0 ? props.activeTabId * theme.tabWidth : 0)}px
    );
    margin-left: 50px;
  `};
  ${media.phablet`
    margin-left: 25px;
  `};
`;

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
    font-size: ${fontSizes.sm};
  }
  a {
    ${mixins.inlineLink};
  }

  > div {
    font-family: ${fonts.SFMono};
  }
`;
const StyledJobTitle = styled.h4`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xxl};
  font-weight: 500;
  margin-bottom: 5px;
`;
const StyledCompany = styled.h6`
  color: ${colors.green};
  font-size: ${fontSizes.lg};
  font-weight: 500;
  margin-bottom: 5px;
`;
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
`;

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
`;

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(2, 12, 27, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const StyledModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${colors.lightNavy};
  padding: 30px;
  border-radius: ${theme.borderRadius};
  margin: 20px;
  ${media.tablet`padding: 25px;`};
  ${media.phablet`padding: 20px;`};
`;

const StyledModalCloseButton = styled.button`
  ${mixins.smallButton};
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px;
  line-height: 1;
  border-radius: 50%;
  ${media.tablet`top: 15px; right: 15px;`};
  ${media.phablet`top: 10px; right: 10px;`};
`;

const StyledModalTitle = styled.h2`
  font-size: ${fontSizes.xxl};
  margin-bottom: 30px;
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: ${fontSizes.xl};`};
`;

const StyledModalBody = styled.div`
  color: ${colors.slate};
  font-family: ${fonts.Calibre};
  font-size: ${fontSizes.lg};
  line-height: 1.5;
  ${media.tablet`font-size: ${fontSizes.md};`};

  p {
    margin-bottom: 20px;
  }

  ul {
    ${mixins.fancyList};
  }
`;

const Jobs = ({ data }) => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const tabs = useRef([]);

  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
    } else {
      // If we're at the end, go to the start
      if (tabFocus >= tabs.current.length) {
        setTabFocus(0);
      }
      // If we're at the start, move to the end
      if (tabFocus < 0) {
        setTabFocus(tabs.current.length - 1);
      }
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  const onKeyPressed = e => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
      if (e.keyCode === 40) {
        // Move down
        setTabFocus(tabFocus + 1);
      } else if (e.keyCode === 38) {
        // Move up
        setTabFocus(tabFocus - 1);
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleModalOpen = (title, content) => {
    setModalContent({ title, content });
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <StyledContainer id="jobs" ref={revealContainer}>
      <Heading>
        <Dot>.</Dot>
        experiences ()
      </Heading>
      <StyledTabs>
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyPressed(e)}>
          {data &&
            data.map(({ node }, i) => {
              const { company } = node.frontmatter;
              return (
                <li key={i}>
                  <StyledTabButton
                    isActive={activeTabId === i}
                    onClick={() => setActiveTabId(i)}
                    ref={el => (tabs.current[i] = el)}
                    id={`tab-${i}`}
                    role="tab"
                    aria-selected={activeTabId === i ? true : false}
                    aria-controls={`panel-${i}`}
                    tabIndex={activeTabId === i ? '0' : '-1'}>
                    <span>{company}</span>
                  </StyledTabButton>
                </li>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        {data &&
          data.map(({ node }, i) => {
            const { frontmatter, html, fields } = node;
            const { title, company, range } = frontmatter;
            const hasBlog = fields && fields.blog;
            
            return (
              <StyledTabContent
                key={i}
                isActive={activeTabId === i}
                id={`panel-${i}`}
                role="tabpanel"
                aria-labelledby={`tab-${i}`}
                tabIndex={activeTabId === i ? '0' : '-1'}
                hidden={activeTabId !== i}>
                <StyledJobTitle>{title}</StyledJobTitle>
                <StyledCompany>{company}</StyledCompany>
                <StyledJobDetails>
                  <span>{range}</span>
                </StyledJobDetails>
                <div dangerouslySetInnerHTML={{ __html: html }} />
                {hasBlog && (
                  <StyledBlogButton
                    onClick={() => handleModalOpen(`${title} @ ${company}`, fields.blog.content)}>
                    Learn More
                  </StyledBlogButton>
                )}
              </StyledTabContent>
            );
          })}
      </StyledTabs>

      <StyledModalOverlay isOpen={modalOpen} onClick={handleModalClose}>
        <StyledModalContent onClick={e => e.stopPropagation()}>
          <StyledModalCloseButton onClick={handleModalClose}>×</StyledModalCloseButton>
          <StyledModalTitle>{modalContent.title}</StyledModalTitle>
          <StyledModalBody dangerouslySetInnerHTML={{ __html: modalContent.content }} />
        </StyledModalContent>
      </StyledModalOverlay>
    </StyledContainer>
  );
};

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Jobs;
