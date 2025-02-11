'use client'

import React from 'react'
import NextImage from 'next/image'
import PropTypes from 'prop-types'

const Image = ({ src, alt = '', width = 500, height = 300 }) => {
  if (!src) return null

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ width: '100%', height: 'auto' }}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Image 