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
import ClientWrapper from '../components/ClientWrapper'

export default function ClientPage({ initialContent }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Transform technologies data to match component expectations
  const technologiesData = initialContent.technologies?.sections || []

  // Transform jobs data to match component expectations
  const jobsData = initialContent.jobs?.jobs || []

  // Transform education data to match component expectations
  const educationData = initialContent.education?.education || []

  // Transform featured projects data to match component expectations
  const featuredData = initialContent.featured?.featured || []

  // Transform projects data to match component expectations
  const projectsData = initialContent.projects?.projects || []

  return (
    <ClientWrapper>
      <Layout>
        {isMounted && (
          <>
            <Hero data={initialContent.hero} />
            <About data={initialContent.about} technologiesData={technologiesData} />
            <Jobs data={jobsData} />
            <Education data={educationData} />
            <Featured data={featuredData} />
            <Projects data={projectsData} />
            <Contact data={initialContent.contact} />
          </>
        )}
      </Layout>
    </ClientWrapper>
  )
} 