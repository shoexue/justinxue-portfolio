'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Layout } from '@/components'
import styled from 'styled-components'
import { theme, mixins, Main } from '@/styles'
const { colors } = theme

const StyledTagsContainer = styled(Main)`
  max-width: 1000px;

  h1 {
    margin-bottom: 50px;
  }
  ul {
    color: ${colors.lightSlate};
    li {
      font-size: 18px;
      margin-bottom: 10px;
      a {
        ${mixins.inlineLink};
      }
    }
  }
`

export default function Tags() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags')
        if (!res.ok) {
          throw new Error('Failed to fetch tags')
        }
        const data = await res.json()
        setTags(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Layout>
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/blog">All posts</Link>
        </span>

        <h1>Tags</h1>
        <ul>
          {tags.map((tag, i) => (
            <li key={i}>
              <Link href={`/blog/tags/${tag.name}`}>
                #{tag.name} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </StyledTagsContainer>
    </Layout>
  )
} 