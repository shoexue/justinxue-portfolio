'use client'

import { useEffect } from 'react'
import Layout from '../components/layout'
import Hero from '../components/sections/hero'
import About from '../components/sections/about'
import Jobs from '../components/sections/jobs'
import Featured from '../components/sections/featured'
import Projects from '../components/sections/projects'
import Contact from '../components/sections/contact'
import Education from '../components/sections/education'
import { content } from '../lib/content'

export default function ClientPage() {
  useEffect(() => {
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