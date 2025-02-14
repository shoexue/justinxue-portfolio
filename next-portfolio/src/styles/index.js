'use client'

import GlobalStyle from './GlobalStyle'
import theme from './theme'
import mixins from './mixins'
import media from './media'
import Main from './Main'
import Section from './Section'
import Heading from './Heading'
import Button from './Button'
import InlineLink from './InlineLink'
import Footer from './Footer'
import Header from './Header'
import Dot from './Dot'
import FractalTreeContainer from './FractalTree'
import styled from 'styled-components'

export {
  GlobalStyle,
  theme,
  mixins,
  media,
  Main,
  Section,
  Heading,
  Button,
  InlineLink,
  Footer,
  Header,
  Dot,
  FractalTreeContainer,
}

export const FractalTreeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 50px;
  margin-bottom: 50px;
` 