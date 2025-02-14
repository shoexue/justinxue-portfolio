'use client'

import styled from 'styled-components'
import media from './media'

const FractalTreeContainer = styled.div`
  width: 100%;
  height: 45vh;
  margin-top: 50px;
  ${media.desktop`height: 45vh;`}
  ${media.tablet`height: 40vh;`}
  ${media.thone`height: 35vh;`}
  ${media.phablet`height: 30vh;`}
  ${media.phone`height: 30vh;`}
  ${media.tiny`height: 25vh;`}
`

export default FractalTreeContainer 