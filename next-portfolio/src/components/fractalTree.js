'use client'

import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme, media } from '../styles'
const { colors, fontSizes, fonts } = theme

// Helper functions
function dft(p5, points) {
  const fourierCoef = []
  const numPoints = points.length

  for (let k = 0; k < numPoints; k++) {
    let re = 0
    let im = 0
    for (let n = 0; n < numPoints; n++) {
      const phi = (p5.TWO_PI * k * n) / numPoints
      re += points[n] * p5.cos(phi)
      im -= points[n] * p5.sin(phi)
    }
    re /= numPoints
    im /= numPoints
    const freq = k
    const amp = p5.sqrt(re * re + im * im)
    const phase = p5.atan2(im, re)

    fourierCoef[k] = { re, im, freq, amp, phase }
  }

  return fourierCoef
}

function pathfinderSVG(pathTags, factor) {
  const arr = []
  for (let j = 0; j < pathTags.length; j++) {
    arr.push([])
    const path = pathTags[j]
    const pathLength = path.getTotalLength()
    const n_points = Math.floor(pathLength / factor)
    for (let i = 0; i < n_points; i++) {
      const point = path.getPointAtLength((i / n_points) * pathLength)
      arr[j].push(point)
    }
  }
  return arr
}

function getBoundingBox(points) {
  if (!points || !points.length) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  }

  let minX = points[0].x
  let maxX = points[0].x
  let minY = points[0].y
  let maxY = points[0].y

  for (let i = 1; i < points.length; i++) {
    if (points[i].x < minX) minX = points[i].x
    if (points[i].x > maxX) maxX = points[i].x
    if (points[i].y < minY) minY = points[i].y
    if (points[i].y > maxY) maxY = points[i].y
  }
  return { minX, maxX, minY, maxY }
}

function epiCycles(p5, time, runningX, runningY, rotation, fourier) {
  let sumX = runningX
  let sumY = runningY

  p5.noFill()
  p5.stroke(200, 200, 200, 150)
  p5.strokeWeight(1.5)

  for (let i = 0; i < fourier.length; i++) {
    const prevX = sumX
    const prevY = sumY

    const freq = fourier[i].freq
    const radius = fourier[i].amp
    const phase = fourier[i].phase

    sumX += radius * Math.cos(freq * time + phase + rotation)
    sumY += radius * Math.sin(freq * time + phase + rotation)

    p5.ellipse(prevX, prevY, radius * 2)

    p5.strokeWeight(1)
    p5.line(prevX, prevY, sumX, sumY)
    p5.strokeWeight(1.5)
  }
  p5.strokeWeight(1.5)
  return p5.createVector(sumX, sumY)
}

// Styled Components
const StyledCanvasMessage = styled.p`
  margin-top: 20px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.lg};
  color: ${colors.white};
`

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
`

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
`

const StyledCanvasWrapper = styled.div`
  width: 90% !important;
  height: 45vh;
  background-color: rgba(16, 16, 16, 0.4);
  margin-bottom: 20px;

  ${media.desktop`
    height: 45vh;
  `}
  ${media.tablet`
    height: 40vh;
  `}
  ${media.thone`
    height: 35vh;
  `}
  ${media.phablet`
    height: 30vh;
  `}
  ${media.phone`
    height: 30vh;
  `}
  ${media.tiny`
    height: 25vh;
  `}
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`

const FractalTree = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawTree = (startX, startY, len, angle, branchWidth) => {
      ctx.beginPath()
      ctx.save()
      
      ctx.strokeStyle = colors.green
      ctx.lineWidth = branchWidth
      ctx.translate(startX, startY)
      ctx.rotate((angle * Math.PI) / 180)
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -len)
      ctx.stroke()

      if (len < 10) {
        ctx.restore()
        return
      }

      drawTree(0, -len, len * 0.8, angle - 15, branchWidth * 0.8)
      drawTree(0, -len, len * 0.8, angle + 15, branchWidth * 0.8)

      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawTree(canvas.width / 2, canvas.height - 50, 120, 0, 2)
      animationFrameId = window.requestAnimationFrame(render)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <StyledCanvas ref={canvasRef} />
}

export default FractalTree 