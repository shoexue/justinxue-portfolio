import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 70%;
  height: 70%;
`;

const FractalTree = () => {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0.45);
  const maxAngle = 2;
  const minAngle = 0;
  const speed = 0.01;
  const [animating, setAnimating] = useState(false);
  let increment = speed;

  const isMobile = window.innerWidth <= 768; // Using 768px as the breakpoint for mobile devices

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawLine = len => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();
    };

    const drawBranch = (len, angle, depth) => {
      drawLine(len);
      if (len < 4) {
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
    };

    const drawTree = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      drawBranch(120, angle, 0);
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
  }, [animating, isMobile]); // Include isMobile in the dependency array

  return (
    <Canvas
      ref={canvasRef}
      onMouseOver={isMobile ? null : () => setAnimating(true)}
      onMouseOut={isMobile ? null : () => setAnimating(false)}
      onFocus={isMobile ? null : () => setAnimating(true)}
      onBlur={isMobile ? null : () => setAnimating(false)}
      tabIndex={0}
    />
  );
};

export default FractalTree;
