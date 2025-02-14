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

  .post-link {
    ${mixins.inlineLink};
    font-size: 24px;
    margin-bottom: 20px;
    display: block;
  }

  .post-date {
    color: ${colors.lightSlate};
    font-family: ${theme.fonts.SFMono};
    font-size: 14px;
  }
`

async function getPostsByTag(tag) {
  const res = await fetch(`/api/tags/${tag}`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default async function Tag({ params }) {
  const { tag } = params
  const posts = await getPostsByTag(tag)

  return (
    <Layout>
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/blog/tags">View all tags</Link>
        </span>

        <h1>#{tag}</h1>

        <div>
          {posts.map(({ frontmatter }, i) => (
            <div key={i}>
              <Link href={`/blog/${frontmatter.slug}`} className="post-link">
                {frontmatter.title}
              </Link>
              <p className="post-date">
                {new Date(frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      </StyledTagsContainer>
    </Layout>
  )
} 