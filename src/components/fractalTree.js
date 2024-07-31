import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const FractalTree = () => {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0.45);
  const maxAngle = 0.8;
  const minAngle = 0.1;
  const speed = 0.01;
  let increment = speed;

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

    const animateAngle = () => {
      setAngle(prevAngle => {
        if (prevAngle >= maxAngle || prevAngle <= minAngle) {
          increment = -increment;
        }
        return prevAngle + increment;
      });
    };

    const interval = setInterval(animateAngle, 20);

    return () => clearInterval(interval);
  }, [angle]);

  const handleMouseOver = () => setAngle(minAngle);
  const handleMouseOut = () => setAngle(maxAngle);
  const handleFocus = () => setAngle(minAngle);
  const handleBlur = () => setAngle(maxAngle);

  return (
    <Canvas
      ref={canvasRef}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    />
  );
};

export default FractalTree;
