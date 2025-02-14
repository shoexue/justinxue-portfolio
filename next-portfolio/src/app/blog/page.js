'use client'

import React from 'react'
import Link from 'next/link'
import { Layout } from '@/components'
import styled from 'styled-components'
import { theme, mixins, Main } from '@/styles'
const { colors, fontSizes } = theme

const StyledMainContainer = styled(Main)`
  & > header {
    margin-bottom: 100px;
    text-align: center;

    a {
      &:hover,
      &:focus {
        cursor: pointer;
      }
    }
  }

  footer {
    ${mixins.flexBetween};
    margin-top: 20px;
    width: 100%;
  }
`
const StyledGrid = styled.div`
  margin-top: 50px;

  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
  }
`
const StyledPostInner = styled.div`
  ${mixins.boxShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2rem 1.75rem;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: ${colors.lightGray};

  header,
  a {
    width: 100%;
  }
`
const StyledPost = styled.div`
  transition: ${theme.transition};
  cursor: default;

  &:hover,
  &:focus {
    outline: 0;
    ${StyledPostInner} {
      transform: translateY(-5px);
    }
  }
`
const StyledPostHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`
const StyledPostName = styled.h5`
  margin: 0 0 10px;
  font-size: ${fontSizes.xxl};
  color: ${colors.lightestSlate};
`
const StyledPostDescription = styled.div`
  font-size: 17px;
  color: ${colors.lightSlate};
`

async function getPosts() {
  const res = await fetch('/api/posts')
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <Layout>
      <StyledMainContainer>
        <header>
          <h1 className="big-title">Blog</h1>
          <p className="subtitle">
            <Link href="/blog/tags">View all tags</Link>
          </p>
        </header>

        <StyledGrid>
          <div className="posts">
            {posts.map(({ frontmatter, html }, i) => {
              const { title, description, slug, date } = frontmatter
              return (
                <StyledPost key={i}>
                  <StyledPostInner>
                    <header>
                      <Link href={`/blog/${slug}`}>
                        <StyledPostHeader>
                          <StyledPostName>{title}</StyledPostName>
                        </StyledPostHeader>
                        <StyledPostDescription>
                          <p>{description}</p>
                        </StyledPostDescription>
                      </Link>
                    </header>
                    <footer>
                      <span>
                        <time>
                          {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </span>
                    </footer>
                  </StyledPostInner>
                </StyledPost>
              )
            })}
          </div>
        </StyledGrid>
      </StyledMainContainer>
    </Layout>
  )
} 