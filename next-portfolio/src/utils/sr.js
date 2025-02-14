'use client'

import { useEffect, useState } from 'react'

export default function useScrollReveal() {
  const [sr, setSr] = useState(null)

  useEffect(() => {
    async function initScrollReveal() {
      const ScrollReveal = (await import('scrollreveal')).default
      setSr(ScrollReveal())
    }
    
    initScrollReveal()
  }, [])

  return sr
} 