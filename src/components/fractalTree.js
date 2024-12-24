// FractalTree.js
import React, { useRef, useEffect } from "react";
import * as p5 from "p5";

/********************************************************************/
/********************* HELPER FUNCTIONS (DO NOT CONDENSE) ***********/
/********************************************************************/

/** @function dft: Discrete Fourier Transform of an array of points. */
function dft(pFIVE, points) {
  const fourierCoef = [];
  const numPoints = points.length;
  for (let k = 0; k < numPoints; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < numPoints; n++) {
      const phi = (pFIVE.TWO_PI * k * n) / numPoints;
      re += points[n] * pFIVE.cos(phi);
      im -= points[n] * pFIVE.sin(phi);
    }
    re /= numPoints;
    im /= numPoints;
    let freq = k;
    let amp = pFIVE.sqrt(re * re + im * im);
    let phase = pFIVE.atan2(im, re);
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
  let arr = [];
  for (let j = 0; j < pathTags.length; j++) {
    arr.push([]);
    let path = pathTags[j];
    let pathLength = path.getTotalLength();
    let n_points = Math.floor(pathLength / factor);
    for (let i = 0; i < n_points; i++) {
      let point = path.getPointAtLength((i / n_points) * pathLength);
      arr[j].push(point);
    }
  }
  return arr;
}

/**
 * @function getBoundingBox
 * Given an array of points like [{x, y}, ...],
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
    if (points[i].x < minX) minX = points[i].x;
    if (points[i].x > maxX) maxX = points[i].x;
    if (points[i].y < minY) minY = points[i].y;
    if (points[i].y > maxY) maxY = points[i].y;
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
  let centerX = (minX + maxX) / 2;
  let centerY = (minY + maxY) / 2;

  return { offsetX: canvasWidth / 2 - centerX, offsetY: canvasHeight / 2 - centerY };
}

/**
 * @function epiCycles
 * Draws epicycles in subtle gray, returning the final (x,y) coordinate
 * of the *true* sum (unmodified). We also accept an optional maxRadius
 * for the user drawing, so we do not visually display circles bigger than that.
 *
 * @param {p5} pFIVE
 * @param {number} time
 * @param {number} runningX
 * @param {number} runningY
 * @param {number} rotation
 * @param {Array} fourier - DFT coefficients
 * @param {number} [maxRadius=null] - if given, clamp circle radius for display
 */
function epiCycles(pFIVE, time, runningX, runningY, rotation, fourier, maxRadius = null) {
  const CANVAS_W = pFIVE.width;
  const CANVAS_H = pFIVE.height;

  let sumX = runningX;
  let sumY = runningY;

  pFIVE.noFill();
  pFIVE.stroke(128, 128, 128, 100);

  for (let i = 0; i < fourier.length; i++) {
    let prevX = sumX;
    let prevY = sumY;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    // The actual math for the final path
    sumX += radius * Math.cos(freq * time + phase + rotation);
    sumY += radius * Math.sin(freq * time + phase + rotation);

    // For circle display, center is midpoint
    let midX = (prevX + sumX) / 2;
    let midY = (prevY + sumY) / 2;

    // Optionally clamp radius if maxRadius is specified (user epicycles only)
    let clampedRadius = radius;
    if (maxRadius !== null && clampedRadius > maxRadius) {
      clampedRadius = maxRadius;
    }

    // Also clamp if it goes beyond canvas boundaries
    let maxR_H = Math.min(midX, CANVAS_W - midX);
    let maxR_V = Math.min(midY, CANVAS_H - midY);
    let maxR = Math.max(0, Math.min(maxR_H, maxR_V));
    if (clampedRadius > maxR) {
      clampedRadius = maxR;
    }

    // Draw the circle
    pFIVE.ellipse(midX, midY, clampedRadius * 2);

    // Then the line from center to the final sum point
    let dispX2 = sumX;
    let dispY2 = sumY;
    if (dispX2 < 0) dispX2 = 0;
    if (dispX2 > CANVAS_W) dispX2 = CANVAS_W;
    if (dispY2 < 0) dispY2 = 0;
    if (dispY2 > CANVAS_H) dispY2 = CANVAS_H;

    pFIVE.line(midX, midY, dispX2, dispY2);
  }

  return pFIVE.createVector(sumX, sumY);
}

/********************************************************************/
/******************** THE MAIN REACT COMPONENT **********************/
/********************************************************************/

const FractalTree = () => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 
        c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 
        c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 
        c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 
        c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 
        c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 
        c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 
        c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/>
      </svg>
    `;

    const sketch = (pFIVE) => {
      /***************************************************************/
      /** GitHub shape data (SVG) **/
      /***************************************************************/
      let githubFourierX = [];
      let githubFourierY = [];
      let githubOffset = { x: 0, y: 0 }; // shift to center
      let githubTime = 0;
      let githubPath = [];

      /***************************************************************/
      /** User drawing data **/
      /***************************************************************/
      let userIsDrawing = false;
      let userPoints = [];
      let userFourierX = [];
      let userFourierY = [];
      let userOffset = { x: 0, y: 0 };
      let userTime = 0;
      let userPath = [];
      let userStartedDrawing = false; // if true => hide GitHub

      // Hard-coded maximum radius for user epicycles
      const userMaxRadius = 50; // Reduced max radius

      // Variables to store canvas dimensions
      let canvasWidth = 700;
      let canvasHeight = 600;

      pFIVE.setup = function () {
        // Get the size of the parent div
        const parent = sketchRef.current;
        const rect = parent.getBoundingClientRect();
        canvasWidth = rect.width;
        canvasHeight = rect.height;

        const cnv = pFIVE.createCanvas(canvasWidth, canvasHeight);
        cnv.parent(sketchRef.current);
        pFIVE.frameRate(20);
        pFIVE.background(0);

        // 1) Parse the GitHub SVG
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgData, "image/svg+xml");
        const pathTags = doc.getElementsByTagName("path");

        // We sample the path
        const sampleFactor = 1;
        let pathSketch = pathfinderSVG(pathTags, sampleFactor)[0];

        // Convert to array of { x, y } points
        let svgPoints = [];
        // Multiply by scale factor so the GitHub shape is appropriately sized
        const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100; // Adjust as needed
        for (let i = 0; i < pathSketch.length; i++) {
          svgPoints.push({
            x: pathSketch[i].x * scaleFactor,
            y: pathSketch[i].y * scaleFactor,
          });
        }

        // Center offset for GitHub shape
        let { offsetX, offsetY } = getCenterOffset(svgPoints, canvasWidth, canvasHeight);
        githubOffset.x = offsetX;
        githubOffset.y = offsetY;

        // Build X/Y arrays, do DFT
        let xArr = svgPoints.map((pt) => pt.x);
        let yArr = svgPoints.map((pt) => pt.y);
        githubFourierX = dft(pFIVE, xArr);
        githubFourierY = dft(pFIVE, yArr);

        /***************************************************************/
        /** Setup user events (mouse/touch)                         **/
        /***************************************************************/
        pFIVE.mousePressed = function () {
          if (
            pFIVE.mouseX >= 0 &&
            pFIVE.mouseX <= pFIVE.width &&
            pFIVE.mouseY >= 0 &&
            pFIVE.mouseY <= pFIVE.height
          ) {
            userIsDrawing = true;
            userStartedDrawing = true; // Hide GitHub
            // Clear everything
            githubPath.length = 0;
            userPath.length = 0;
            userPoints.length = 0;
            userFourierX.length = 0;
            userFourierY.length = 0;
            githubTime = 0;
            userTime = 0;
          }
        };

        pFIVE.mouseReleased = function () {
          if (userIsDrawing) {
            userIsDrawing = false;
            if (userPoints.length > 1) {
              // Calculate centroid of userPoints
              let { minX, maxX, minY, maxY } = getBoundingBox(userPoints);
              let centerX = (minX + maxX) / 2;
              let centerY = (minY + maxY) / 2;

              // Shift userPoints to center at (0,0)
              let shiftedPoints = userPoints.map(pt => ({
                x: pt.x - centerX,
                y: pt.y - centerY,
              }));

              // Set userOffset to canvas center
              userOffset.x = canvasWidth / 2;
              userOffset.y = canvasHeight / 2;

              // Build X/Y arrays from shiftedPoints
              let ux = shiftedPoints.map((pt) => pt.x);
              let uy = shiftedPoints.map((pt) => pt.y);

              userFourierX = dft(pFIVE, ux);
              userFourierY = dft(pFIVE, uy);
              userPath = [];
              userTime = 0;
            }
          }
        };

        pFIVE.mouseDragged = function () {
          if (userIsDrawing) {
            if (
              pFIVE.mouseX >= 0 &&
              pFIVE.mouseX <= pFIVE.width &&
              pFIVE.mouseY >= 0 &&
              pFIVE.mouseY <= pFIVE.height
            ) {
              userPoints.push({ x: pFIVE.mouseX, y: pFIVE.mouseY });
            }
          }
        };

        // Handle window resize
        pFIVE.windowResized = function () {
          const parent = sketchRef.current;
          const rect = parent.getBoundingClientRect();
          canvasWidth = rect.width;
          canvasHeight = rect.height;
          pFIVE.resizeCanvas(canvasWidth, canvasHeight);

          // Recalculate offsets based on new canvas size
          if (!userStartedDrawing && githubFourierX.length > 0 && githubFourierY.length > 0) {
            let { offsetX: newOffsetX, offsetY: newOffsetY } = getCenterOffset(
              githubPath.map(v => ({x: v.x, y: v.y})),
              canvasWidth,
              canvasHeight
            );
            githubOffset.x = newOffsetX;
            githubOffset.y = newOffsetY;
          }

          if (userStartedDrawing && userFourierX.length > 0 && userFourierY.length > 0) {
            // Assuming userOffset is already at canvas center
            userOffset.x = canvasWidth / 2;
            userOffset.y = canvasHeight / 2;
          }
        };
      };

      pFIVE.draw = function () {
        pFIVE.clear();
        pFIVE.background(0); // Set background to black

        // If user hasn't started drawing => show GitHub shape
        if (!userStartedDrawing && githubFourierX.length > 0 && githubFourierY.length > 0) {
          let vx = epiCycles(
            pFIVE,
            githubTime,
            githubOffset.x,
            githubOffset.y,
            0,
            githubFourierX // no max radius for GitHub
          );
          let vy = epiCycles(
            pFIVE,
            githubTime,
            githubOffset.x + 150, // Reduced shift to fit smaller canvas
            githubOffset.y,
            pFIVE.HALF_PI,
            githubFourierY // no max radius for GitHub
          );

          let v = pFIVE.createVector(vx.x, vy.y);
          githubPath.push(v);

          pFIVE.stroke(128, 128, 128, 200);
          pFIVE.line(vx.x, vx.y, v.x, v.y);
          pFIVE.line(vy.x, vy.y, v.x, v.y);

          pFIVE.stroke("#8FFF5A");
          pFIVE.beginShape();
          for (let i = 0; i < githubPath.length; i++) {
            pFIVE.vertex(githubPath[i].x, githubPath[i].y);
          }
          pFIVE.endShape();

          let dt = pFIVE.TWO_PI / githubFourierX.length;
          githubTime += dt;
          if (githubTime > pFIVE.TWO_PI * 2) {
            githubTime = 0;
            githubPath = [];
          }
        }

        // If user is drawing => show stroke in real-time
        if (userIsDrawing && userPoints.length > 1) {
          pFIVE.stroke("#8FFF5A");
          pFIVE.noFill();
          pFIVE.beginShape();
          for (let i = 0; i < userPoints.length; i++) {
            pFIVE.vertex(userPoints[i].x, userPoints[i].y);
          }
          pFIVE.endShape();
        }

        // If user has a Fourier => animate it
        if (!userIsDrawing && userFourierX.length > 0 && userFourierY.length > 0) {
          // Pass userMaxRadius=50 for the user's epicycles
          let vx = epiCycles(
            pFIVE,
            userTime,
            userOffset.x,
            userOffset.y,
            0,
            userFourierX,
            50 // <-- reduced max radius for the user
          );
          let vy = epiCycles(
            pFIVE,
            userTime,
            userOffset.x + 100, // Reduced shift for smaller canvas
            userOffset.y,
            pFIVE.HALF_PI,
            userFourierY,
            50 // <-- reduced max radius for the user
          );

          let v = pFIVE.createVector(vx.x, vy.y);
          userPath.push(v);

          pFIVE.stroke(128, 128, 128, 200);
          pFIVE.line(vx.x, vx.y, v.x, v.y);
          pFIVE.line(vy.x, vy.y, v.x, v.y);

          pFIVE.stroke("#8FFF5A");
          pFIVE.beginShape();
          for (let i = 0; i < userPath.length; i++) {
            pFIVE.vertex(userPath[i].x, userPath[i].y);
          }
          pFIVE.endShape();

          let dt = pFIVE.TWO_PI / userFourierX.length;
          userTime += dt;
          if (userTime > pFIVE.TWO_PI * 2) {
            userTime = 0;
            userPath = [];
          }
        }
      };
    };

    let p5Instance = new p5(sketch);
    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div
      style={{ width: "90%", height: "90%", backgroundColor: "black" }}
      ref={sketchRef}
    />
  );
};

export default FractalTree;
