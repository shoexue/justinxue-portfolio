'use client'

import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { Loader } from '../components'
import Hero from '../components/sections/hero'
import About from '../components/sections/about'
import Jobs from '../components/sections/jobs'
import Featured from '../components/sections/featured'
import Projects from '../components/sections/projects'
import Contact from '../components/sections/contact'
import Education from '../components/sections/education'

export default function ClientPage() {
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content')
        if (!response.ok) {
          throw new Error('Failed to fetch content')
        }
        const data = await response.json()
        setContent(data)
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()

    // Add smooth scrolling behavior
    const handleClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href')
      if (href?.startsWith('/#')) {
        e.preventDefault()
        const targetId = href.replace('/#', '')
        const elem = document.getElementById(targetId)
        if (elem) {
          elem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
          // Update URL without page reload
          window.history.pushState({}, '', href)
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (isLoading) {
    return <Loader finishLoading={() => setIsLoading(false)} />
  }

  if (!content) {
    return <div>Error loading content</div>
  }

  return (
    <Layout>
      <Hero data={content.hero} />
      <About data={content.about} technologiesData={content.technologies} />
      <Jobs data={content.jobs} />
      <Education data={content.education} />
      <Featured data={content.featured} />
      <Projects data={content.projects} />
      <Contact data={content.contact} />
    </Layout>
  )
} 