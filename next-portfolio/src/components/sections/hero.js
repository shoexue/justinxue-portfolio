'use client'

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { theme, mixins, media, Section, FractalTreeContainer } from '../../styles'
import { FractalTree } from '..'
const { colors, fontSizes, fonts, navDelay, loaderDelay } = theme

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`
const StyledOverline = styled.h1`
  color: ${colors.green};
  margin: 0 0 20px 3px;
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`
const StyledTitle = styled.h2`
  font-size: 80px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`
const StyledSubtitle = styled.h3`
  font-size: 80px;
  line-height: 1.1;
  color: ${colors.slate};
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`
const StyledDescription = styled.div`
  margin-top: 25px;
  margin-bottom: 5px;
  width: 50%;
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false)
  const refs = useRef([])

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 1000)
    return () => clearTimeout(timeout)
  }, [])

  const { frontmatter, html } = data[0]

  const one = () => (
    <StyledOverline style={{ transitionDelay: '100ms' }}>{frontmatter.title}</StyledOverline>
  )
  const two = () => (
    <StyledTitle style={{ transitionDelay: '200ms' }}>{frontmatter.name}</StyledTitle>
  )
  const three = () => (
    <StyledSubtitle style={{ transitionDelay: '300ms' }}>{frontmatter.subtitle}</StyledSubtitle>
  )
  const four = () => (
    <div>
      <StyledDescription
        style={{ transitionDelay: '400ms' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )

  const five = () => (
    <FractalTreeContainer style={{ transitionDelay: '500ms' }}>
      <FractalTree />
    </FractalTreeContainer>
  )

  const items = [one, two, three, four, five]

  return (
    <StyledContainer>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => {
            refs.current[i] = refs.current[i] || React.createRef()
            return (
              <CSSTransition key={i} classNames="fadeup" timeout={2000} nodeRef={refs.current[i]}>
                <div style={{ transitionDelay: `${i + 1}00ms` }} ref={refs.current[i]}>
                  {item()}
                </div>
              </CSSTransition>
            )
          })}
      </TransitionGroup>
    </StyledContainer>
  )
}

Hero.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Hero 