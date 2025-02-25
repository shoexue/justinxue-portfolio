"use client";

import styled from "styled-components";
import media from "./media";

const FractalTreeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  .canvas-container {
    width: 100%;
    height: 45vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    background-color: rgba(16, 16, 16, 0.4);
    border-radius: 4px;

    ${media.desktop`height: 45vh;`}
    ${media.tablet`height: 40vh;`}
    ${media.thone`height: 35vh;`}
    ${media.phablet`height: 30vh;`}
    ${media.phone`height: 30vh;`}
    ${media.tiny`height: 25vh;`}
  }

  .controls-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`;

export default FractalTreeContainer;
