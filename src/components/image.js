'use client'

import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import styled from 'styled-components'

const StyledImage = styled(Image)`
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
`

const CustomImage = ({ src, alt, ...props }) => {
  if (!src) {
    return null
  }

  return (
    <StyledImage
      src={src}
      alt={alt}
      width={500}
      height={300}
      {...props}
    />
  )
}

CustomImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default CustomImage 