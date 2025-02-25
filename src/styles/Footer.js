import styled from 'styled-components'
import theme from './theme'
import media from './media'
import mixins from './mixins'

const Footer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 15px;
  text-align: center;
  height: auto;
  min-height: 70px;
  
  ${media.tablet`padding: 15px;`};
`

export default Footer 