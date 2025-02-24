"use client";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import media from "../styles/media";
import { theme } from "@/styles";
// Use the single container
import { FractalTreeContainer } from "@/styles";
const { colors, fontSizes, fonts } = theme;

/** DFT utility */
function dft(p5, points) {
  const fourier = [];
  const N = points.length;

  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const phi = (p5.TWO_PI * k * n) / N;
      re += points[n] * p5.cos(phi);
      im -= points[n] * p5.sin(phi);
    }
    re /= N;
    im /= N;
    const freq = k;
    const amp = p5.sqrt(re * re + im * im);
    const phase = p5.atan2(im, re);
    fourier[k] = { re, im, freq, amp, phase };
  }
  return fourier;
}

/** Parse <path> data from an SVG and sample them. */
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

/** Utility for bounding box of points */
function getBoundingBox(points) {
  if (!points || !points.length) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  }
  let minX = points[0].x,
    maxX = points[0].x,
    minY = points[0].y,
    maxY = points[0].y;
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, maxX, minY, maxY };
}

/** EpiCycles drawing */
function epiCycles(p5, time, cx, cy, rotation, fourier) {
  let x = cx;
  let y = cy;

  p5.noFill();
  p5.stroke(200, 200, 200, 150);
  p5.strokeWeight(1.5);

  for (let i = 0; i < fourier.length; i++) {
    const prevx = x;
    const prevy = y;

    const { freq, amp, phase } = fourier[i];
    x += amp * Math.cos(freq * time + phase + rotation);
    y += amp * Math.sin(freq * time + phase + rotation);

    p5.ellipse(prevx, prevy, amp * 2);
    p5.strokeWeight(1);
    p5.line(prevx, prevy, x, y);
    p5.strokeWeight(1.5);
  }
  return p5.createVector(x, y);
}

// Some styled UI
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

const FractalTree = () => {
  const sketchRef = useRef(null);
  const p5InstanceRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Toggling user drawing
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const isDrawingEnabledRef = useRef(isDrawingEnabled);

  useEffect(() => {
    isDrawingEnabledRef.current = isDrawingEnabled;
  }, [isDrawingEnabled]);

  // Update dimensions when the ref is available
  useEffect(() => {
    const updateDimensions = () => {
      if (sketchRef.current) {
        const rect = sketchRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    // Initial update
    updateDimensions();

    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Only create p5 once we have dimensions
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // IMPORTANT: Only create p5 once
    if (p5InstanceRef.current) {
      // If we already have an instance, do nothing
      return;
    }

    import("p5")
      .then((p5Module) => {
        const p5 = p5Module.default;

        const sketch = (p5) => {
          let canvasWidth = dimensions.width;
          let canvasHeight = dimensions.height;
          let initialScaleFactor = Math.min(canvasWidth, canvasHeight) / 700;

          // Data for the "pi" shape
          const piTransformed = [];
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

          p5.setup = () => {
            // Create canvas with the current dimensions
            const cnv = p5.createCanvas(canvasWidth, canvasHeight);
            cnv.parent(sketchRef.current);

            p5.frameRate(30);
            p5.background(0);

            // Parse the Pi SVG
            const svgData = `
<svg xmlns="http://www.w3.org/2000/svg" width="496" height="480">
  <path d="m438.22802734 8.64404297 2.27796102.01614785C456.0040156 8.77030667 471.50200226 8.88575912 487 9l1 74H373v30c-.31725084 6.79191715-.68434585 13.54339728-1.21484375 20.31640625-.1340483 1.81113676-.2677386 3.62230004-.40110779 5.43348694-1.73708105 23.13566429-4.01533407 46.22731558-6.24952698 69.31907654-3.1583017 32.53054037-3.1583017 32.53054037-5.39624023 65.13415527l-.11914254 2.19875908c-3.22130518 55.55383246-3.22130518 55.55383246 19.22070504 104.66061592 9.37009413 8.89105047 21.76634487 12.340019 34.41015625 12.25l2.52539062-.01708984C429.208001 392.03268869 440.78264788 387.90533259 451 379c11.26132693-12.96758858 15.32433614-28.24336145 17-45 1-1 1-1 2.85766601-1.1135254.79075928.00523683 1.58151856.01047364 2.39624024.01586915l2.58789062.00976563L478.5625 332.9375l2.73242187.01367188c2.23509126.01182588 4.4700525.02830592 6.70507813.04882812-1.10257854 41.56721092-15.57447568 85.2754681-46.15625 114.5390625-20.96312864 18.141169-45.69601446 24.6354905-72.96875 23.2734375C343.9384704 468.46382686 322.32160136 458.23536004 306 439c-31.22093618-40.18120485-20.86996242-98.11862161-17.296875-145.1171875l.25427246-3.3701477c2.29512125-30.2190082 5.28677093-60.3734356 8.24050903-90.53344727.98253895-10.03408238 1.9593943-20.06869247 2.92709351-30.10421753l.3791809-3.9251709c2.04614445-21.27110944 3.78260271-42.55636996 5.29122925-63.87219238l.22810364-3.1904297c.13861384-1.94916172.27431497-3.8985338.40646362-5.84814452l.18452454-2.60595703.15376282-2.24368286C307.02418121 85.77153717 307.52316495 83.38417524 308 81H204l-2.16015625 25.51171875C185.35798795 300.9089659 185.35798795 300.9089659 146 450l-2.25 3.125c-11.63596458 12.16487205-26.43985822 17.72021218-43 18.25-14.73397065-.2522432-27.89755814-5.55105243-38.625-15.6875-11.23892025-12.01121495-15.741093-26.57329341-15.39453125-42.81640625 1.17385351-16.85925836 12.75550768-30.86009794 22.66210937-43.76171875C129.37666895 290.39392167 152.47683642 199.6198937 157 82c-32.39023849-1.72994096-67.85956152-2.52099316-94 20l-2.12109375 1.65625c-11.28629657 9.23246444-18.24917083 22.33371275-25.41308594 34.7915039-1.46217257 2.53422199-2.96100992 5.04323066-4.4658203 7.5522461-.58523439 1.04414063-1.17046876 2.08828125-1.7734375 3.1640625-3.11265542 2.56657552-5.40881005 2.20443029-9.33203126 1.91992188L17.25 150.8125l-2.69140625-.21289062C12.36931206 150.4230544 10.18501065 150.22250036 8 150c2.51095654-7.82877361 5.44722978-15.46876978 8.4375-23.125 1.0813857-2.77318193 2.16194462-5.54668522 3.2421875-8.3203125l.8351593-2.14239502c1.8805432-4.83253353 3.72636882-9.67727187 5.5554657-14.52947998C42.73173784 57.79325949 42.73173784 57.79325949 55 44"/>
`;

            const parser = new DOMParser();
            const doc = parser.parseFromString(svgData, "image/svg+xml");
            const pathTags = doc.getElementsByTagName("path");
            if (!pathTags.length) {
              console.error("No <path> elements found in Pi SVG.");
              return;
            }
            const sampleFactor = 3;
            const allPaths = pathfinderSVG(pathTags, sampleFactor);
            if (!allPaths.length || !allPaths[0].length) {
              console.error("No path data in Pi SVG.");
              return;
            }
            const pathSketch = allPaths[0];

            // Scale & center the Pi
            for (let i = 0; i < pathSketch.length; i++) {
              const sx = pathSketch[i].x * initialScaleFactor;
              const sy = pathSketch[i].y * initialScaleFactor;
              piTransformed.push({ x: sx, y: sy });
            }
            const { minX, maxX, minY, maxY } = getBoundingBox(piTransformed);
            const cX = (minX + maxX) / 2;
            const cY = (minY + maxY) / 2;
            for (let i = 0; i < piTransformed.length; i++) {
              piTransformed[i].x -= cX;
              piTransformed[i].y -= cY;
            }

            // DFT
            const xArr = piTransformed.map((pt) => pt.x);
            const yArr = piTransformed.map((pt) => pt.y);
            piFourierX = dft(p5, xArr);
            piFourierY = dft(p5, yArr);
          };

          // Mouse events
          p5.mousePressed = () => {
            if (
              isDrawingEnabledRef.current &&
              p5.mouseX >= 0 &&
              p5.mouseX <= p5.width &&
              p5.mouseY >= 0 &&
              p5.mouseY <= p5.height
            ) {
              userIsDrawing = true;
              userPoints.length = 0;
              userTransformed.length = 0;
              userFourierX.length = 0;
              userFourierY.length = 0;
              userPath.length = 0;
              userTime = 0;
            }
          };

          p5.mouseReleased = () => {
            if (userIsDrawing) {
              userIsDrawing = false;
              if (userPoints.length > 1) {
                transformUserPoints();
              }
            }
          };

          p5.mouseDragged = () => {
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

          // Touch events
          p5.touchStarted = (e) => {
            if (!isDrawingEnabledRef.current) return;
            if (p5.touches && p5.touches.length > 0) {
              const tx = p5.touches[0].x;
              const ty = p5.touches[0].y;
              if (tx >= 0 && tx <= p5.width && ty >= 0 && ty <= p5.height) {
                userIsDrawing = true;
                userPoints.length = 0;
                userTransformed.length = 0;
                userFourierX.length = 0;
                userFourierY.length = 0;
                userPath.length = 0;
                userTime = 0;
                e.preventDefault();
              }
            }
          };

          p5.touchMoved = (e) => {
            if (!isDrawingEnabledRef.current) return;
            if (userIsDrawing && p5.touches && p5.touches.length > 0) {
              const tx = p5.touches[0].x;
              const ty = p5.touches[0].y;
              if (tx >= 0 && tx <= p5.width && ty >= 0 && ty <= p5.height) {
                userPoints.push({ x: tx, y: ty });
                e.preventDefault();
              }
            }
          };

          p5.touchEnded = (e) => {
            if (userIsDrawing) {
              userIsDrawing = false;
              if (userPoints.length > 1) {
                transformUserPoints();
                if (
                  p5.mouseX >= 0 &&
                  p5.mouseX <= p5.width &&
                  p5.mouseY >= 0 &&
                  p5.mouseY <= p5.height
                ) {
                  e.preventDefault();
                }
              }
            }
          };

          function transformUserPoints() {
            userTransformed.length = 0;
            for (let i = 0; i < userPoints.length; i++) {
              userTransformed.push({ x: userPoints[i].x, y: userPoints[i].y });
            }
            const { minX, maxX, minY, maxY } = getBoundingBox(userTransformed);
            const cx = (minX + maxX) / 2;
            const cy = (minY + maxY) / 2;
            for (let i = 0; i < userTransformed.length; i++) {
              userTransformed[i].x -= cx;
              userTransformed[i].y -= cy;
            }
            const ux = userTransformed.map((pt) => pt.x);
            const uy = userTransformed.map((pt) => pt.y);
            userFourierX = dft(p5, ux);
            userFourierY = dft(p5, uy);
            hasUserDFT = true;
            userPath.length = 0;
            userTime = 0;
          }

          p5.resetSketch = () => {
            piPath.length = 0;
            piTime = 0;
            userPoints.length = 0;
            userTransformed.length = 0;
            userFourierX.length = 0;
            userFourierY.length = 0;
            userPath.length = 0;
            userTime = 0;
            hasUserDFT = false;
          };

          p5.windowResized = () => {
            const parent = sketchRef.current;
            const rect = parent.getBoundingClientRect();
            p5.resizeCanvas(rect.width, rect.height);
          };

          p5.draw = () => {
            p5.clear();

            // If drawing, disable default scrolling
            if (isDrawingEnabledRef.current) {
              p5.select("canvas")?.style("touch-action", "none");
            } else {
              p5.select("canvas")?.style("touch-action", "auto");
            }

            const cx = p5.width / 2;
            const cy = p5.height / 2;

            if (!isDrawingEnabledRef.current) {
              // Show Pi shape
              if (piFourierX.length && piFourierY.length) {
                const vx = epiCycles(p5, piTime, cx, cy, 0, piFourierX);
                const vy = epiCycles(
                  p5,
                  piTime,
                  cx,
                  cy,
                  p5.HALF_PI,
                  piFourierY
                );
                const v = p5.createVector(vx.x, vy.y);
                piPath.push({ x: v.x - cx, y: v.y - cy });

                // lines connecting
                p5.strokeWeight(2);
                p5.stroke(128, 128, 128, 200);
                p5.line(vx.x, vx.y, v.x, v.y);
                p5.line(vy.x, vy.y, v.x, v.y);
                p5.strokeWeight(2);

                // draw path
                p5.stroke(colors.green);
                p5.beginShape();
                for (let i = 0; i < piPath.length; i++) {
                  p5.vertex(piPath[i].x + cx, piPath[i].y + cy);
                }
                p5.endShape();
                p5.strokeWeight(1);

                // speed
                const speed = 3;
                const dt = (p5.TWO_PI / piFourierX.length) * speed;
                piTime += dt;
                if (piTime > p5.TWO_PI * 2) {
                  piTime = 0;
                  piPath.length = 0;
                }
              }
            } else {
              // user drawing
              if (userIsDrawing && userPoints.length > 1) {
                p5.stroke(colors.green);
                p5.strokeWeight(2);
                p5.noFill();
                p5.beginShape();
                for (let i = 0; i < userPoints.length; i++) {
                  p5.vertex(userPoints[i].x, userPoints[i].y);
                }
                p5.endShape();
              }

              if (hasUserDFT && userFourierX.length && userFourierY.length) {
                const vx = epiCycles(p5, userTime, cx, cy, 0, userFourierX);
                const vy = epiCycles(
                  p5,
                  userTime,
                  cx,
                  cy,
                  p5.HALF_PI,
                  userFourierY
                );
                const v = p5.createVector(vx.x, vy.y);
                userPath.push({ x: v.x - cx, y: v.y - cy });

                // lines connecting
                p5.strokeWeight(1);
                p5.stroke(128, 128, 128, 200);
                p5.line(vx.x, vx.y, v.x, v.y);
                p5.line(vy.x, vy.y, v.x, v.y);

                // final path
                p5.strokeWeight(2);
                p5.stroke(colors.green);
                p5.beginShape();
                for (let i = 0; i < userPath.length; i++) {
                  p5.vertex(userPath[i].x + cx, userPath[i].y + cy);
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

        // Create the p5 instance
        const myp5 = new p5(sketch);
        p5InstanceRef.current = myp5;
      })
      .catch((err) => console.error("Failed to load p5:", err));

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [dimensions]);

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
    <FractalTreeContainer>
      <div className="canvas-container" ref={sketchRef} />
      <div className="controls-container">
        <StyledCanvasMessage>
          Draw something (one continuous line) to see it turned into a Fourier
          series animation!
        </StyledCanvasMessage>
        <StyledDescription>
          Confused? This{" "}
          <a
            href="https://www.youtube.com/watch?v=r6sGWTCMz2k&t=1s"
            target="_blank"
            rel="noopener noreferrer"
          >
            video
          </a>{" "}
          explains Fourier series better than I ever could.
          <br />
          <em>tldw:</em> circles + math + drawings = ✨
        </StyledDescription>
        <StyledToggleButton onClick={handleToggle}>
          {isDrawingEnabled ? "Stop drawing" : "Draw your own"}
        </StyledToggleButton>
      </div>
    </FractalTreeContainer>
  );
};

export default FractalTree;
