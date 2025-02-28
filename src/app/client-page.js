'use client'

import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Hero from '../components/sections/hero'
import About from '../components/sections/about'
import Jobs from '../components/sections/jobs'
import Featured from '../components/sections/featured'
import Projects from '../components/sections/projects'
import Contact from '../components/sections/contact'
import Education from '../components/sections/education'
import { content } from '../lib/content'
import ClientWrapper from '../components/ClientWrapper'

export default function ClientPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0a192f',
        color: '#64ffda'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <ClientWrapper>
      <Layout>
        <Hero data={content.hero} />
        <About data={content.about} technologiesData={content.technologies} />
        <Jobs data={content.jobs} />
        <Education data={content.education} />
        <Featured data={content.featured} />
        <Projects data={content.projects} />
        <Contact data={content.contact} />
      </Layout>
    </ClientWrapper>
  )
} 