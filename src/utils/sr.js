'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from 'scrollreveal'

const defaultConfig = {
  duration: 500,
  distance: '20px',
  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  origin: 'bottom',
  viewFactor: 0.25,
}

const useScrollReveal = () => {
  const [sr, setSr] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollReveal = ScrollReveal(defaultConfig)
      setSr(scrollReveal)
    }
  }, [])

  return sr
}

export default useScrollReveal 