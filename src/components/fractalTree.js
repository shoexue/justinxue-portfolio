// FractalTree.js
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import media from '../styles/media';
import { theme } from '@styles';

const { colors, fontSizes, fonts } = theme;

/**
 * @function dft
 * Discrete Fourier Transform of an array of numeric points.
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
    if (points[i].x < minX) {minX = points[i].x;}
    if (points[i].x > maxX) {maxX = points[i].x;}
    if (points[i].y < minY) {minY = points[i].y;}
    if (points[i].y > maxY) {maxY = points[i].y;}
  }

  return { minX, maxX, minY, maxY };
}

/**
 * @function getCenterOffset
 * Takes an array of points and returns an (offsetX, offsetY)
 * to center them on the given canvas size.
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
 * Renders epicycles. Returns final sum point for x,y.
 */
function epiCycles(p5, time, runningX, runningY, rotation, fourier, maxRadius = null) {
  let sumX = runningX;
  let sumY = runningY;

  p5.noFill();
  p5.stroke(200, 200, 200, 150);
  p5.strokeWeight(1.5);

  for (let i = 0; i < fourier.length; i++) {
    const prevX = sumX;
    const prevY = sumY;

    const freq = fourier[i].freq;
    const radius = fourier[i].amp;
    const phase = fourier[i].phase;

    sumX += radius * Math.cos(freq * time + phase + rotation);
    sumY += radius * Math.sin(freq * time + phase + rotation);

    p5.ellipse(prevX, prevY, radius * 2);

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
  font-size: ${fontSizes.lg};
  color: ${colors.white};
`;

const StyledToggleButton = styled.button`
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
    color: ${colors.white};
    background-color: ${colors.transGreen};
    outline: none;
  }
`;

const StyledDescription = styled.p`
  margin-top: 1px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.white};
  text-align: center;

  a {
    color: ${colors.green};
    text-decoration: none;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
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

/********************************************************************/
/******************** MAIN REACT COMPONENT **************************/
/********************************************************************/

const FractalTree = () => {
  const sketchRef = useRef(null);
  const p5InstanceRef = useRef(null);

  // State to manage drawing toggle
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const isDrawingEnabledRef = useRef(isDrawingEnabled);

  // Update the ref whenever the state changes
  useEffect(() => {
    isDrawingEnabledRef.current = isDrawingEnabled;
  }, [isDrawingEnabled]);

  useEffect(() => {
    import('p5')
      .then(p5Module => {
        const p5 = p5Module.default;

        // The raw SVG data
        const svgData = `
<svg xmlns="http://www.w3.org/2000/svg" width="496" height="480">
  <path d="m438.22802734 8.64404297 2.27796102.01614785C456.0040156 8.77030667 471.50200226 8.88575912 487 9l1 74H373v30c-.31725084 6.79191715-.68434585 13.54339728-1.21484375 20.31640625-.1340483 1.81113676-.2677386 3.62230004-.40110779 5.43348694-1.73708105 23.13566429-4.01533407 46.22731558-6.24952698 69.31907654-3.1583017 32.53054037-3.1583017 32.53054037-5.39624023 65.13415527l-.11914254 2.19875908c-3.22130518 55.55383246-3.22130518 55.55383246 19.22070504 104.66061592 9.37009413 8.89105047 21.76634487 12.340019 34.41015625 12.25l2.52539062-.01708984C429.208001 392.03268869 440.78264788 387.90533259 451 379c11.26132693-12.96758858 15.32433614-28.24336145 17-45 1-1 1-1 2.85766601-1.1135254.79075928.00523683 1.58151856.01047364 2.39624024.01586915l2.58789062.00976563L478.5625 332.9375l2.73242187.01367188c2.23509126.01182588 4.4700525.02830592 6.70507813.04882812-1.10257854 41.56721092-15.57447568 85.2754681-46.15625 114.5390625-20.96312864 18.141169-45.69601446 24.6354905-72.96875 23.2734375C343.9384704 468.46382686 322.32160136 458.23536004 306 439c-31.22093618-40.18120485-20.86996242-98.11862161-17.296875-145.1171875l.25427246-3.3701477c2.29512125-30.2190082 5.28677093-60.3734356 8.24050903-90.53344727.98253895-10.03408238 1.9593943-20.06869247 2.92709351-30.10421753l.3791809-3.9251709c2.04614445-21.27110944 3.78260271-42.55636996 5.29122925-63.87219238l.22810364-3.1904297c.13861384-1.94916172.27431497-3.8985338.40646362-5.84814452l.18452454-2.60595703.15376282-2.24368286C307.02418121 85.77153717 307.52316495 83.38417524 308 81H204l-2.16015625 25.51171875C185.35798795 300.9089659 185.35798795 300.9089659 146 450l-2.25 3.125c-11.63596458 12.16487205-26.43985822 17.72021218-43 18.25-14.73397065-.2522432-27.89755814-5.55105243-38.625-15.6875-11.23892025-12.01121495-15.741093-26.57329341-15.39453125-42.81640625 1.17385351-16.85925836 12.75550768-30.86009794 22.66210937-43.76171875C129.37666895 290.39392167 152.47683642 199.6198937 157 82c-32.39023849-1.72994096-67.85956152-2.52099316-94 20l-2.12109375 1.65625c-11.28629657 9.23246444-18.24917083 22.33371275-25.41308594 34.7915039-1.46217257 2.53422199-2.96100992 5.04323066-4.4658203 7.5522461-.58523439 1.04414063-1.17046876 2.08828125-1.7734375 3.1640625-3.11265542 2.56657552-5.40881005 2.20443029-9.33203126 1.91992188L17.25 150.8125l-2.69140625-.21289062C12.36931206 150.4230544 10.18501065 150.22250036 8 150c2.51095654-7.82877361 5.44722978-15.46876978 8.4375-23.125 1.0813857-2.77318193 2.16194462-5.54668522 3.2421875-8.3203125l.8351593-2.14239502c1.8805432-4.83253353 3.72636882-9.67727187 5.5554657-14.52947998C42.73173784 57.79325949 42.73173784 57.79325949 55 44"/>
</svg>
`;
        // Define the sketch
        const sketch = p5 => {
          let canvasWidth; let canvasHeight;

          // pi shape
          const piTransformed = []; // Scaled and centered points
          let piFourierX = [];
          let piFourierY = [];
          let piTime = 0;
          const piPath = [];

          // User shape
          let userIsDrawing = false;
          const userPoints = []; 
          const userTransformed = []; 
          let userFourierX = [];
          let userFourierY = [];
          let userTime = 0;
          const userPath = [];
          let hasUserDFT = false; 

          // Store original pi points for reset
          const originalpiPoints = [];

          // Initial Scaling Factor based on initial canvas size
          let initialScaleFactor = 1;

          // Setup function
          p5.setup = function() {
            const parent = sketchRef.current;
            const rect = parent.getBoundingClientRect();
            canvasWidth = rect.width;
            canvasHeight = rect.height;

            initialScaleFactor = Math.min(canvasWidth, canvasHeight) / 700;

            const cnv = p5.createCanvas(canvasWidth, canvasHeight);
            cnv.parent(sketchRef.current);
            cnv.style('touch-action', 'none'); // Only handle events inside the canvas
            p5.frameRate(30);
            p5.background(0);

            // Parse SVG
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
              console.error('No path data found in the SVG.');
              return;
            }
            const pathSketch = allPathSketches[0];

            // Store original pi points
            for (let i = 0; i < pathSketch.length; i++) {
              originalpiPoints.push({ x: pathSketch[i].x, y: pathSketch[i].y });
            }

            for (let i = 0; i < originalpiPoints.length; i++) {
              const sx = originalpiPoints[i].x * initialScaleFactor;
              const sy = originalpiPoints[i].y * initialScaleFactor;
              piTransformed.push({ x: sx, y: sy });
            }

            const { minX, maxX, minY, maxY } = getBoundingBox(piTransformed);
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;

            for (let i = 0; i < piTransformed.length; i++) {
              piTransformed[i].x -= centerX;
              piTransformed[i].y -= centerY;
            }

            const xArr = piTransformed.map(pt => pt.x);
            const yArr = piTransformed.map(pt => pt.y);
            piFourierX = dft(p5, xArr);
            piFourierY = dft(p5, yArr);
          };

          /**
           * MOUSE EVENTS
           */
          p5.mousePressed = function() {
            if (
              isDrawingEnabledRef.current &&
              p5.mouseX >= 0 &&
              p5.mouseX <= p5.width &&
              p5.mouseY >= 0 &&
              p5.mouseY <= p5.height
            ) {
              userIsDrawing = true;
              userStartedDrawing = true;
              userPoints.length = 0;
              userTransformed.length = 0;
              userFourierX.length = 0;
              userFourierY.length = 0;
              userPath.length = 0;
              userTime = 0;
            }
          };
          p5.mouseReleased = function() {
            if (userIsDrawing) {
              userIsDrawing = false;
              if (userPoints.length > 1) {
                transformUserPoints();
              }
            }
          };
          p5.mouseDragged = function() {
            if (userIsDrawing && isDrawingEnabledRef.current) {
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

          /**
           * TOUCH EVENTS
           */
          p5.touchStarted = function(event) {
            if (p5.touches && p5.touches.length > 0) {
              const tx = p5.touches[0].x;
              const ty = p5.touches[0].y;
              if (isDrawingEnabledRef.current && tx >= 0 && tx <= p5.width && ty >= 0 && ty <= p5.height) {
                userIsDrawing = true;
                userStartedDrawing = true;
                userPoints.length = 0;
                userTransformed.length = 0;
                userFourierX.length = 0;
                userFourierY.length = 0;
                userPath.length = 0;
                userTime = 0;

                event.preventDefault();
              }
            }
          };
          p5.touchEnded = function(event) {
            if (userIsDrawing) {
              userIsDrawing = false;
              if (userPoints.length > 1) {
                // Perform transformation and DFT on user-drawn points
                transformUserPoints();
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
            if (userIsDrawing && p5.touches && p5.touches.length > 0 && isDrawingEnabledRef.current) {
              const tx = p5.touches[0].x;
              const ty = p5.touches[0].y;
              if (tx >= 0 && tx <= p5.width && ty >= 0 && ty <= p5.height) {
                userPoints.push({ x: tx, y: ty });
                event.preventDefault();
              }
            }
          };

          function transformUserPoints() {
            userTransformed.length = 0;
            for (let i = 0; i < userPoints.length; i++) {
              const sx = userPoints[i].x; 
              const sy = userPoints[i].y; 
              userTransformed.push({ x: sx, y: sy });
            }

            // Center user points at (0,0)
            const { minX, maxX, minY, maxY } = getBoundingBox(userTransformed);
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;

            for (let i = 0; i < userTransformed.length; i++) {
              userTransformed[i].x -= centerX;
              userTransformed[i].y -= centerY;
            }
            const ux = userTransformed.map(pt => pt.x);
            const uy = userTransformed.map(pt => pt.y);
            userFourierX = dft(p5, ux);
            userFourierY = dft(p5, uy);

            hasUserDFT = true;
            userPath.length = 0;
            userTime = 0;
          }

          /**
           * @function resetSketch
           * Resets everything back to original pi shape, user shape cleared.
           */
          p5.resetSketch = function() {
            // Reset pi path and time
            piPath.length = 0;
            piTime = 0;

            // Reset user data
            userIsDrawing = false;
            userStartedDrawing = false;
            userPoints.length = 0;
            userTransformed.length = 0;
            userFourierX.length = 0;
            userFourierY.length = 0;
            userPath.length = 0;
            userTime = 0;
            hasUserDFT = false;
          };

          /**
           * WINDOW RESIZE
           */
          p5.windowResized = function() {
            const parent = sketchRef.current;
            const rect = parent.getBoundingClientRect();
            const newWidth = rect.width;
            const newHeight = rect.height;
            p5.resizeCanvas(newWidth, newHeight);
            canvasWidth = newWidth;
            canvasHeight = newHeight;
          };

          /**
           * DRAW LOOP
           */
          p5.draw = function() {
            p5.clear();

            // Current center of the canvas
            const currentOffsetX = canvasWidth / 2;
            const currentOffsetY = canvasHeight / 2;

            if (!isDrawingEnabledRef.current) {
              // Show pi animation
              if (piFourierX.length > 0 && piFourierY.length > 0) {
                const vx = epiCycles(p5, piTime, currentOffsetX, currentOffsetY, 0, piFourierX);
                const vy = epiCycles(p5, piTime, currentOffsetX, currentOffsetY, p5.HALF_PI, piFourierY);

                const v = p5.createVector(vx.x, vy.y);
                piPath.push({ x: v.x - currentOffsetX, y: v.y - currentOffsetY }); 

                p5.strokeWeight(2);
                p5.stroke(128, 128, 128, 200);
                p5.line(vx.x, vx.y, v.x, v.y);
                p5.line(vy.x, vy.y, v.x, v.y);
                p5.strokeWeight(2);

                p5.stroke(colors.green);
                p5.beginShape();
                for (let i = 0; i < piPath.length; i++) {
                  p5.vertex(piPath[i].x + currentOffsetX, piPath[i].y + currentOffsetY);
                }
                p5.endShape();
                p5.strokeWeight(1);

                const speed = 3;
                const dt = (p5.TWO_PI / piFourierX.length) * speed;
                piTime += dt;
                if (piTime > p5.TWO_PI * 2) {
                  piTime = 0;
                  piPath.length = 0;
                }
              }
            } else {
              // Show user drawing
              if (userIsDrawing && userPoints.length > 1) {
                p5.stroke(colors.green);
                p5.strokeWeight(2);
                p5.noFill();
                p5.beginShape();
                for (let i = 0; i < userPoints.length; i++) {
                  p5.vertex(userPoints[i].x, userPoints[i].y);
                }
                p5.endShape();
                p5.strokeWeight(2);
              }

              if (hasUserDFT && userFourierX.length > 0 && userFourierY.length > 0) {
                const vx = epiCycles(p5, userTime, currentOffsetX, currentOffsetY, 0, userFourierX);
                const vy = epiCycles(p5, userTime, currentOffsetX, currentOffsetY, p5.HALF_PI, userFourierY);

                const v = p5.createVector(vx.x, vy.y);
                userPath.push({ x: v.x - currentOffsetX, y: v.y - currentOffsetY }); // Store relative

                p5.strokeWeight(1);
                p5.stroke(128, 128, 128, 200);
                p5.line(vx.x, vx.y, v.x, v.y);
                p5.line(vy.x, vy.y, v.x, v.y);
                p5.strokeWeight(2);

                p5.stroke(colors.green);
                p5.beginShape();
                for (let i = 0; i < userPath.length; i++) {
                  p5.vertex(userPath[i].x + currentOffsetX, userPath[i].y + currentOffsetY);
                }
                p5.endShape();
                p5.strokeWeight(1);

                const dt = (p5.TWO_PI / userFourierX.length) * 1;
                userTime += dt;
                if (userTime > p5.TWO_PI * 2) {
                  userTime = 0;
                  userPath.length = 0;
                }
              }
            }
          };
        };

        const myp5 = new p5(sketch);
        p5InstanceRef.current = myp5;

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

  // Handle toggle button click
  const handleToggle = () => {
    if (isDrawingEnabled) {
      setIsDrawingEnabled(false);
      if (p5InstanceRef.current && p5InstanceRef.current.resetSketch) {
        p5InstanceRef.current.resetSketch();
      }
    } else {
      setIsDrawingEnabled(true);
      if (p5InstanceRef.current) {
        p5InstanceRef.current.background(0);
      }
    }
  };

  return (
    <StyledContainer>
      <StyledCanvasWrapper ref={sketchRef} />
      <div style={{ textAlign: 'center' }}>
        <StyledCanvasMessage>
          Draw something (one continuous line) to see it transformed into a Fourier series animation!
        </StyledCanvasMessage>
        <StyledDescription>
          Confused? This{' '}
          <a
            href="https://www.youtube.com/watch?v=r6sGWTCMz2k&t=1s"
            target="_blank"
            rel="noopener noreferrer"
          >
            video
          </a>{' '}
          can explain Fourier series much better than I can.
          <br />
          <em>tldw:</em> circles + math + drawings = ✨
        </StyledDescription>
        <StyledToggleButton onClick={handleToggle}>
          {isDrawingEnabled ? 'Stop drawing' : 'Draw your own'}
        </StyledToggleButton>
      </div>
    </StyledContainer>
  );
};

export default FractalTree;
