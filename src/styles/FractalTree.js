import styled from 'styled-components';
import { media } from '@styles';
const FractalTreeContainer = styled.div`
  width: 30%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 0px; // Add margin to handle spacing explicitly

  ${media.desktop`height: 250px;`};
  ${media.tablet`width: 40%; height: 200px;`};
  ${media.phablet`width: 50%; height: 150px;`};
  ${media.phone`width: 60%; height: 100px;`}; // Further reduce size on very small devices
`;

export default FractalTreeContainer;
