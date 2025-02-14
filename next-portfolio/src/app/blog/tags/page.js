'use client'

import React from 'react'
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

async function getTags() {
  const res = await fetch('/api/tags')
  if (!res.ok) throw new Error('Failed to fetch tags')
  return res.json()
}

export default async function Tags() {
  const tags = await getTags()

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