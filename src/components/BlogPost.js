'use client'

import React from 'react'
import Link from 'next/link'
import { Layout } from '@/components'
import styled from 'styled-components'
import { theme, mixins, Main } from '@/styles'
const { colors, fontSizes } = theme

const StyledPostContainer = styled(Main)`
  max-width: 1000px;
`
const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`
const StyledPostContent = styled.div`
  margin-bottom: 100px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: ${colors.lightSlate};
  }

  a {
    ${mixins.inlineLink};
  }

  code {
    background-color: ${colors.lightGray};
    color: ${colors.lightestSlate};
    border-radius: 3px;
    font-size: ${fontSizes.sm};
    padding: 0.2em 0.4em;
  }

  pre {
    background-color: ${colors.lightGray};
    color: ${colors.lightestSlate};
    border-radius: 3px;
    padding: 1em;
    overflow-x: auto;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  ul,
  ol {
    padding: 0 0 0 2em;
    margin: 1em 0;
  }

  li {
    margin: 0.25em 0;
    line-height: 1.5;
    color: ${colors.lightSlate};
  }
`

export default function BlogPost({ post }) {
  if (!post) {
    return <div>Post not found</div>
  }

  const { title, date, tags, content } = post

  return (
    <Layout>
      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/blog">All posts</Link>
        </span>

        <StyledPostHeader>
          <h1 className="medium-title">{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>&nbsp;&mdash;&nbsp;</span>
            {tags &&
              tags.map((tag, i) => (
                <Link key={i} href={`/blog/tags/${tag}`} className="tag">
                  #{tag}
                </Link>
              ))}
          </p>
        </StyledPostHeader>

        <StyledPostContent dangerouslySetInnerHTML={{ __html: content }} />
      </StyledPostContainer>
    </Layout>
  )
} 