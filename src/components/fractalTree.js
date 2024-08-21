import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 50%; // Set a specific width for the canvas
  height: 50%; // Take the full height of the container
`;

const FractalTree = () => {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0.45);
  const maxAngle = 1.7; // Allow wider angles
  const minAngle = 0.1; // Minimum angle
  const speed = 0.008; // Slower animation speed
  const [animating, setAnimating] = useState(true);
  let increment = speed;

  const isMobile = window.innerWidth <= 768; // Using 768px as the breakpoint for mobile devices

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasHeight = window.innerHeight; // Get viewport height for sizing

    if (isMobile) {
      canvas.width = window.innerWidth * 2;
    } else {
      canvas.width = window.innerWidth;
    }
    canvas.height = window.innerHeight;
    const canvasWidth = canvas.width;

    const initialBranchLength = canvasHeight * 0.3; // Adjust initial branch length based on canvas height

    const drawLine = len => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();
    };

    const drawBranch = (len, angle, depth) => {
      drawLine(len);
      if (len < 5 || depth > 9) {
        // Minimum length of branch and max depth
        return;
      }

      ctx.translate(0, -len);
      ctx.save();
      ctx.rotate(-angle);
      drawBranch(len * 0.67, angle, depth + 1);
      ctx.restore();
      ctx.save();
      ctx.rotate(angle);
      drawBranch(len * 0.67, angle, depth + 1);
      ctx.restore();
      ctx.translate(0, len); // Move back to the original position
    };

    const drawTree = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      drawBranch(initialBranchLength, angle, 0);
      ctx.restore();
    };

    drawTree();
  }, [angle]);

  useEffect(() => {
    let interval;
    if (animating || isMobile) {
      // Always animate on mobile devices
      interval = setInterval(() => {
        setAngle(prevAngle => {
          const newAngle = prevAngle + increment;
          if (newAngle >= maxAngle || newAngle <= minAngle) {
            increment = -increment;
          }
          return newAngle;
        });
      }, 20);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [animating, isMobile]);

  return (
    <Canvas
      ref={canvasRef}
      onMouseOver={isMobile ? null : () => setAnimating(false)}
      onMouseOut={isMobile ? null : () => setAnimating(true)}
      onFocus={isMobile ? null : () => setAnimating(true)}
      onBlur={isMobile ? null : () => setAnimating(false)}
      tabIndex={0}
    />
  );
};

export default FractalTree;
