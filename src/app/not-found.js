'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { theme, mixins } from '../styles'
import StyledComponentsRegistry from '../lib/registry'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;
  background-color: ${colors.navy};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
`

const StyledTitle = styled.h1`
  color: ${colors.green};
  font-family: ${fonts.Calibre};
  font-weight: 800;
  margin-bottom: 1rem;
`

const StyledText = styled.p`
  font-size: ${fontSizes.sm};
  margin: 1rem 0;
  max-width: 500px;
  line-height: 1.5;
`

const StyledLink = styled.a`
  ${mixins.inlineLink};
  padding: 0.75rem 1.5rem;
  margin-top: 2rem;
  font-size: ${fontSizes.md};
`

const StyledImage = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 2rem 0;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`

export default function NotFound() {
  return (
    <StyledComponentsRegistry>
      <StyledContainer>
        <StyledTitle>404 - Well, this is awkward...</StyledTitle>
        <StyledImage>
          <Image
            src="/awkward.png"
            alt="Awkward situation"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </StyledImage>
        <StyledText>
          Looks like you're lost. 
        </StyledText>
        <StyledText>
          While I figure out where this page went, maybe you'd like to head back to somewhere that actually exists?
        </StyledText>
        <StyledLink href="/">
          Return to Known Territory
        </StyledLink>
      </StyledContainer>
    </StyledComponentsRegistry>
  )
} 