'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { Side } from '.'
import styled from 'styled-components'
import { theme } from '../styles'
const { colors, fontSizes, fonts } = theme

const email = 'justin.xue@mail.mcgill.ca'

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${colors.lightSlate};
  }
`
const StyledEmailLink = styled.a`
  font-size: ${fontSizes.lg};
  letter-spacing: 0.1em;
  font-family: ${fonts.Calibre};
  font-weight: 400;
  writing-mode: vertical-rl;
  margin: 20px auto;
  padding: 10px;

  &:hover,
  &:focus {
    transform: translateY(-3px);
  }
`

const Email = ({ isHome }) => (
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      <StyledEmailLink href={`mailto:${email}`}>{email}</StyledEmailLink>
    </StyledLinkWrapper>
  </Side>
)

Email.propTypes = {
  isHome: PropTypes.bool,
}

export default Email 