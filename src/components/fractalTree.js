// FractalTree.js
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import media from '../styles/media';
import { theme } from '@styles';

const { colors, fontSizes, fonts } = theme;

/**
 * @function dft
 * Discrete Fourier Transform of an array of points (numbers).
 */
function dft(p5, points) {
  const fourierCoef = [];
  const numPoints = points.length;

  for (let k = 0; k < numPoints; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < numPoints; n++) {
      const phi = (p5.TWO_PI * k * n) / numPoints;
      re += points[n] * p5.cos(phi);
      im -= points[n] * p5.sin(phi);
    }
    re /= numPoints;
    im /= numPoints;
    const freq = k;
    const amp = p5.sqrt(re * re + im * im);
    const phase = p5.atan2(im, re);

    fourierCoef[k] = { re, im, freq, amp, phase };
  }

  return fourierCoef;
}

/**
 * @function pathfinderSVG
 * Takes an HTMLCollection of <path> elements from an SVG and
 * returns an array of arrays of sampled points.
 */
function pathfinderSVG(pathTags, factor) {
  const arr = [];
  for (let j = 0; j < pathTags.length; j++) {
    arr.push([]);
    const path = pathTags[j];
    const pathLength = path.getTotalLength();
    const n_points = Math.floor(pathLength / factor);
    for (let i = 0; i < n_points; i++) {
      const point = path.getPointAtLength((i / n_points) * pathLength);
      arr[j].push(point);
    }
  }
  return arr;
}

/**
 * @function getBoundingBox
 * Given an array of points like [{ x, y }, ...],
 * returns { minX, maxX, minY, maxY }.
 */
function getBoundingBox(points) {
  if (!points || points.length < 1) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  }

  let minX = points[0].x;
  let maxX = points[0].x;
  let minY = points[0].y;
  let maxY = points[0].y;

  for (let i = 1; i < points.length; i++) {
    if (points[i].x < minX) {
      minX = points[i].x;
    }
    if (points[i].x > maxX) {
      maxX = points[i].x;
    }
    if (points[i].y < minY) {
      minY = points[i].y;
    }
    if (points[i].y > maxY) {
      maxY = points[i].y;
    }
  }

  return { minX, maxX, minY, maxY };
}

/**
 * @function getCenterOffset
 * Takes an array of points and returns an (offsetX, offsetY)
 * that would center them on the given canvas size.
 */
function getCenterOffset(points, canvasWidth, canvasHeight) {
  const { minX, maxX, minY, maxY } = getBoundingBox(points);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return {
    offsetX: canvasWidth / 2 - centerX,
    offsetY: canvasHeight / 2 - centerY,
  };
}

/**
 * @function epiCycles
 * Draws epicycles in subtle gray. Returns the final (x, y) coordinate
 * of the sum.
 */
function epiCycles(p5, time, runningX, runningY, rotation, fourier, maxRadius = null) {
  const CANVAS_W = p5.width;
  const CANVAS_H = p5.height;

  let sumX = runningX;
  let sumY = runningY;

  p5.noFill();
  p5.stroke(200, 200, 200, 150);
  p5.strokeWeight(1.5);

  for (let i = 1; i < fourier.length; i++) {
    const prevX = sumX;
    const prevY = sumY;

    const freq = fourier[i].freq;
    const radius = fourier[i].amp;
    const phase = fourier[i].phase;

    sumX += radius * Math.cos(freq * time + phase + rotation);
    sumY += radius * Math.sin(freq * time + phase + rotation);

    const midX = (prevX + sumX) / 2;
    const midY = (prevY + sumY) / 2;

    let clampedRadius = radius;
    if (maxRadius !== null && clampedRadius > maxRadius) {
      clampedRadius = maxRadius;
    }

    const maxR_H = Math.min(midX, CANVAS_W - midX);
    const maxR_V = Math.min(midY, CANVAS_H - midY);
    const maxR = Math.max(0, Math.min(maxR_H, maxR_V));
    if (clampedRadius > maxR) {
      clampedRadius = maxR;
    }

    p5.ellipse(prevX, prevY, clampedRadius * 2);

    let dispX2 = sumX;
    let dispY2 = sumY;
    if (dispX2 < 0) {
      dispX2 = 0;
    }
    if (dispX2 > CANVAS_W) {
      dispX2 = CANVAS_W;
    }
    if (dispY2 < 0) {
      dispY2 = 0;
    }
    if (dispY2 > CANVAS_H) {
      dispY2 = CANVAS_H;
    }

    p5.strokeWeight(1);
    p5.line(prevX, prevY, sumX, sumY);
    p5.strokeWeight(1.5);
  }

  p5.strokeWeight(1.5);
  return p5.createVector(sumX, sumY);
}

const StyledCanvasMessage = styled.p`
  margin-top: 20px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.md};
  color: ${colors.white};
`;

const StyledResetButton = styled.button`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.green};
  background-color: transparent;
  border: 1px solid ${colors.green};
  border-radius: 4px;
  cursor: pointer;
  transition: ${theme.transition};

  &:hover,
  &:focus {
    color: ${colors.darkBg};
    background-color: ${colors.green};
    outline: none;
  }
`;

const StyledCanvasWrapper = styled.div`
  width: 80%;
  height: 45vh;
  background-color: rgba(16, 16, 16, 0.4);
  margin-bottom: 20px;

  ${media.desktop`
    width: 80%;
    height: 45vh;
  `}

  ${media.tablet`
    width: 85%;
    height: 40vh;
  `}

  ${media.thone`
    width: 90%;
    height: 35vh;
  `}

  ${media.phablet`
    width: 95%;
    height: 30vh;
  `}

  ${media.phone`
    width: 95%;
    height: 30vh;
  `}

  ${media.tiny`
    width: 100%;
    height: 25vh;
  `}
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FractalTree = () => {
  const sketchRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    import('p5')
      .then(p5Module => {
        const p5 = p5Module.default;

        // The raw SVG data
        const svgData = `
<svg xmlns="http://www.w3.org/2000/svg" width="496" height="480">
  <path d="m438.22802734 8.64404297 2.27796102.01614785C456.0040156 8.77030667 471.50200226 8.88575912 487 9l1 74H373v30c-.31725084 6.79191715-.68434585 13.54339728-1.21484375 20.31640625-.1340483 1.81113676-.2677386 3.62230004-.40110779 5.43348694-1.73708105 23.13566429-4.01533407 46.22731558-6.24952698 69.31907654-3.1583017 32.53054037-3.1583017 32.53054037-5.39624023 65.13415527l-.11914254 2.19875908c-3.22130518 55.55383246-3.22130518 55.55383246 19.22070504 104.66061592 9.37009413 8.89105047 21.76634487 12.340019 34.41015625 12.25l2.52539062-.01708984C429.208001 392.03268869 440.78264788 387.90533259 451 379c11.26132693-12.96758858 15.32433614-28.24336145 17-45 1-1 1-1 2.85766601-1.1135254.79075928.00523683 1.58151856.01047364 2.39624024.01586915l2.58789062.00976563L478.5625 332.9375l2.73242187.01367188c2.23509126.01182588 4.4700525.02830592 6.70507813.04882812-1.10257854 41.56721092-15.57447568 85.2754681-46.15625 114.5390625-20.96312864 18.141169-45.69601446 24.6354905-72.96875 23.2734375C343.9384704 468.46382686 322.32160136 458.23536004 306 439c-31.22093618-40.18120485-20.86996242-98.11862161-17.296875-145.1171875l.25427246-3.3701477c2.29512125-30.2190082 5.28677093-60.3734356 8.24050903-90.53344727.98253895-10.03408238 1.9593943-20.06869247 2.92709351-30.10421753l.3791809-3.9251709c2.04614445-21.27110944 3.78260271-42.55636996 5.29122925-63.87219238l.22810364-3.1904297c.13861384-1.94916172.27431497-3.8985338.40646362-5.84814452l.18452454-2.60595703.15376282-2.24368286C307.02418121 85.77153717 307.52316495 83.38417524 308 81H204l-2.16015625 25.51171875C185.35798795 300.9089659 185.35798795 300.9089659 146 450l-2.25 3.125c-11.63596458 12.16487205-26.43985822 17.72021218-43 18.25-14.73397065-.2522432-27.89755814-5.55105243-38.625-15.6875-11.23892025-12.01121495-15.741093-26.57329341-15.39453125-42.81640625 1.17385351-16.85925836 12.75550768-30.86009794 22.66210937-43.76171875C129.37666895 290.39392167 152.47683642 199.6198937 157 82c-32.39023849-1.72994096-67.85956152-2.52099316-94 20l-2.12109375 1.65625c-11.28629657 9.23246444-18.24917083 22.33371275-25.41308594 34.7915039-1.46217257 2.53422199-2.96100992 5.04323066-4.4658203 7.5522461-.58523439 1.04414063-1.17046876 2.08828125-1.7734375 3.1640625-3.11265542 2.56657552-5.40881005 2.20443029-9.33203126 1.91992188L17.25 150.8125l-2.69140625-.21289062C12.36931206 150.4230544 10.18501065 150.22250036 8 150c2.51095654-7.82877361 5.44722978-15.46876978 8.4375-23.125 1.0813857-2.77318193 2.16194462-5.54668522 3.2421875-8.3203125l.8351593-2.14239502c1.8805432-4.83253353 3.72636882-9.67727187 5.5554657-14.52947998C42.73173784 57.79325949 42.73173784 57.79325949 55 44"/>
`;

        const sketch = p5 => {
          let githubFourierX = [];
          let githubFourierY = [];
          let githubOffset = { x: 0, y: 0 };
          let githubTime = 0;
          const githubPath = [];

          let userIsDrawing = false;
          const userPoints = [];
          let userFourierX = [];
          let userFourierY = [];
          const userOffset = { x: 0, y: 0 };
          let userTime = 0;
          let userPath = [];
          let userStartedDrawing = false;

          let canvasWidth = 700;
          let canvasHeight = 600;

          let originalFourierX = [];
          let originalFourierY = [];
          let originalOffset = { x: 0, y: 0 };

          p5.setup = function() {
            const parent = sketchRef.current;
            const rect = parent.getBoundingClientRect();
            canvasWidth = rect.width;
            canvasHeight = rect.height;

            const cnv = p5.createCanvas(canvasWidth, canvasHeight);
            cnv.parent(sketchRef.current);
            cnv.style('touch-action', 'none');
            p5.frameRate(60);
            p5.background(0);

            const parser = new DOMParser();
            const doc = parser.parseFromString(svgData, 'image/svg+xml');
            const pathTags = doc.getElementsByTagName('path');

            if (pathTags.length === 0) {
              console.error('No <path> elements found in the SVG data.');
              return;
            }

            const sampleFactor = 3;
            const allPathSketches = pathfinderSVG(pathTags, sampleFactor);

            if (allPathSketches.length === 0 || !allPathSketches[0].length) {
              console.error('pathSketch is undefined or empty.');
              return;
            }

            const pathSketch = allPathSketches[0];

            const svgPoints = [];
            const scaleFactor = Math.min(canvasWidth, canvasHeight) / 700;
            for (let i = 0; i < pathSketch.length; i++) {
              svgPoints.push({
                x: pathSketch[i].x * scaleFactor,
                y: pathSketch[i].y * scaleFactor,
              });
            }

            const { offsetX, offsetY } = getCenterOffset(svgPoints, canvasWidth, canvasHeight);
            githubOffset.x = offsetX + 90;
            githubOffset.y = offsetY + 100;

            const xArr = svgPoints.map(pt => pt.x);
            const yArr = svgPoints.map(pt => pt.y);

            githubFourierX = dft(p5, xArr);
            githubFourierY = dft(p5, yArr);

            originalFourierX = [...githubFourierX];
            originalFourierY = [...githubFourierY];
            originalOffset = { ...githubOffset };
          };

          // MOUSE EVENTS
          p5.mousePressed = function() {
            if (
              p5.mouseX >= 0 &&
              p5.mouseX <= p5.width &&
              p5.mouseY >= 0 &&
              p5.mouseY <= p5.height
            ) {
              userIsDrawing = true;
              userStartedDrawing = true;
              githubPath.length = 0;
              userPath.length = 0;
              userPoints.length = 0;
              userFourierX.length = 0;
              userFourierY.length = 0;
              githubTime = 0;
              userTime = 0;
            }
          };

          p5.mouseReleased = function() {
            if (userIsDrawing) {
              userIsDrawing = false;
              if (userPoints.length > 1) {
                const { minX, maxX, minY, maxY } = getBoundingBox(userPoints);
                const centerX = (minX + maxX) / 2;
                const centerY = (minY + maxY) / 2;

                const shiftedPoints = userPoints.map(pt => ({
                  x: pt.x - centerX,
                  y: pt.y - centerY,
                }));

                userOffset.x = canvasWidth / 2;
                userOffset.y = canvasHeight / 2;

                const ux = shiftedPoints.map(pt => pt.x);
                const uy = shiftedPoints.map(pt => pt.y);

                userFourierX = dft(p5, ux);
                userFourierY = dft(p5, uy);
                userPath = [];
                userTime = 0;
              }
            }
          };

          p5.mouseDragged = function() {
            if (userIsDrawing) {
              if (
                p5.mouseX >= 0 &&
                p5.mouseX <= p5.width &&
                p5.mouseY >= 0 &&
                p5.mouseY <= p5.height
              ) {
                userPoints.push({ x: p5.mouseX, y: p5.mouseY });
              }
            }
          };

          // TOUCH EVENTS
          p5.touchStarted = function(event) {
            if (p5.touches && p5.touches.length > 0) {
              const tx = p5.touches[0].x;
              const ty = p5.touches[0].y;
              if (tx >= 0 && tx <= p5.width && ty >= 0 && ty <= p5.height) {
                userIsDrawing = true;
                userStartedDrawing = true;
                githubPath.length = 0;
                userPath.length = 0;
                userPoints.length = 0;
                userFourierX.length = 0;
                userFourierY.length = 0;
                githubTime = 0;
                userTime = 0;
                event.preventDefault();
              }
            }
          };

          p5.touchEnded = function(event) {
            if (userIsDrawing) {
              userIsDrawing = false;
              if (userPoints.length > 1) {
                const { minX, maxX, minY, maxY } = getBoundingBox(userPoints);
                const centerX = (minX + maxX) / 2;
                const centerY = (minY + maxY) / 2;

                const shiftedPoints = userPoints.map(pt => ({
                  x: pt.x - centerX,
                  y: pt.y - centerY,
                }));

                userOffset.x = canvasWidth / 2;
                userOffset.y = canvasHeight / 2;

                const ux = shiftedPoints.map(pt => pt.x);
                const uy = shiftedPoints.map(pt => pt.y);

                userFourierX = dft(p5, ux);
                userFourierY = dft(p5, uy);
                userPath = [];
                userTime = 0;

                if (
                  p5.mouseX >= 0 &&
                  p5.mouseX <= p5.width &&
                  p5.mouseY >= 0 &&
                  p5.mouseY <= p5.height
                ) {
                  event.preventDefault();
                }
              }
            }
          };

          p5.touchMoved = function(event) {
            if (userIsDrawing && p5.touches && p5.touches.length > 0) {
              const tx = p5.touches[0].x;
              const ty = p5.touches[0].y;
              if (tx >= 0 && tx <= p5.width && ty >= 0 && ty <= p5.height) {
                userPoints.push({ x: tx, y: ty });
                event.preventDefault();
              }
            }
          };

          // RESIZE
          p5.windowResized = function() {
            const parent = sketchRef.current;
            const rect = parent.getBoundingClientRect();
            canvasWidth = rect.width;
            canvasHeight = rect.height;
            p5.resizeCanvas(canvasWidth, canvasHeight);

            if (!userStartedDrawing && githubFourierX.length > 0 && githubFourierY.length > 0) {
              const { offsetX: newOffsetX, offsetY: newOffsetY } = getCenterOffset(
                githubPath.map(v => ({ x: v.x, y: v.y })),
                canvasWidth,
                canvasHeight,
              );
              githubOffset.x = newOffsetX;
              githubOffset.y = newOffsetY;
            }

            if (userStartedDrawing && userFourierX.length > 0 && userFourierY.length > 0) {
              const { minX, maxX, minY, maxY } = getBoundingBox(userPoints);
              const centerX = (minX + maxX) / 2;
              const centerY = (minY + maxY) / 2;

              userOffset.x = canvasWidth / 2 - centerX;
              userOffset.y = canvasHeight / 2 - centerY;
            }
          };

          // RESET
          p5.resetSketch = function() {
            userStartedDrawing = false;
            userPoints.length = 0;
            userFourierX.length = 0;
            userFourierY.length = 0;
            userPath.length = 0;
            userTime = 0;

            githubFourierX = [...originalFourierX];
            githubFourierY = [...originalFourierY];
            githubOffset = { ...originalOffset };
            githubPath.length = 0;
            githubTime = 0;
          };

          // DRAW
          p5.draw = function() {
            p5.clear();

            if (!userStartedDrawing && githubFourierX.length > 0 && githubFourierY.length > 0) {
              const vx = epiCycles(
                p5,
                githubTime,
                githubOffset.x,
                githubOffset.y,
                0,
                githubFourierX,
              );
              const vy = epiCycles(
                p5,
                githubTime,
                githubOffset.x,
                githubOffset.y,
                p5.HALF_PI,
                githubFourierY,
              );

              const v = p5.createVector(vx.x, vy.y);
              githubPath.push(v);

              p5.strokeWeight(2);
              p5.stroke(128, 128, 128, 200);
              p5.line(vx.x, vx.y, v.x, v.y);
              p5.line(vy.x, vy.y, v.x, v.y);
              p5.strokeWeight(1.5);

              p5.stroke('#8FFF5A');
              p5.strokeWeight(2);
              p5.beginShape();
              for (let i = 0; i < githubPath.length; i++) {
                p5.vertex(githubPath[i].x, githubPath[i].y);
              }
              p5.endShape();
              p5.strokeWeight(1.5);

              const speed = 2;
              const dt = (p5.TWO_PI / githubFourierX.length) * speed;
              githubTime += dt;
              if (githubTime > p5.TWO_PI * 2) {
                githubTime = 0;
                githubPath.length = 0;
              }
            }

            if (userIsDrawing && userPoints.length > 1) {
              p5.stroke('#8FFF5A');
              p5.strokeWeight(2);
              p5.noFill();
              p5.beginShape();
              for (let i = 0; i < userPoints.length; i++) {
                p5.vertex(userPoints[i].x, userPoints[i].y);
              }
              p5.endShape();
              p5.strokeWeight(1.5);
            }

            if (!userIsDrawing && userFourierX.length > 0 && userFourierY.length > 0) {
              const vx = epiCycles(p5, userTime, userOffset.x, userOffset.y, 0, userFourierX, 70);
              const vy = epiCycles(
                p5,
                userTime,
                userOffset.x + 100,
                userOffset.y,
                p5.HALF_PI,
                userFourierY,
                70,
              );

              const v = p5.createVector(vx.x, vy.y);
              userPath.push(v);

              p5.strokeWeight(1);
              p5.stroke(128, 128, 128, 200);
              p5.line(vx.x, vx.y, v.x, v.y);
              p5.line(vy.x, vy.y, v.x, v.y);
              p5.strokeWeight(1);

              p5.stroke('#8FFF5A');
              p5.strokeWeight(2);
              p5.beginShape();
              for (let i = 0; i < userPath.length; i++) {
                p5.vertex(userPath[i].x, userPath[i].y);
              }
              p5.endShape();
              p5.strokeWeight(1);

              const dt = p5.TWO_PI / userFourierX.length;
              userTime += dt;
              if (userTime > p5.TWO_PI * 2) {
                userTime = 0;
                userPath.length = 0;
              }
            }
          };
        };

        const p5Instance = new p5(sketch);
        p5InstanceRef.current = p5Instance;

        return () => {
          if (p5InstanceRef.current) {
            p5InstanceRef.current.remove();
          }
        };
      })
      .catch(err => {
        console.error('Failed to load p5:', err);
      });
  }, []);

  // Reset
  const handleReset = () => {
    if (p5InstanceRef.current && p5InstanceRef.current.resetSketch) {
      p5InstanceRef.current.resetSketch();
    }
  };

  return (
    <StyledContainer>
      <StyledCanvasWrapper ref={sketchRef} />
      <div style={{ textAlign: 'center' }}>
        <StyledCanvasMessage>
          Draw something to see it transformed into a Fourier series animation!
        </StyledCanvasMessage>
        <StyledResetButton onClick={handleReset}>Reset</StyledResetButton>
      </div>
    </StyledContainer>
  );
};

export default FractalTree;
