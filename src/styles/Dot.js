import styled from 'styled-components';
import theme from './theme';
const { colors, fontSizes } = theme;

const Dot = styled.span`
  color: ${colors.green}; // Dot color
  font-size: ${fontSizes.xl}; // Dot size
  padding-right: 10px; // Space between the dot and the title
`;

export default Dot;
