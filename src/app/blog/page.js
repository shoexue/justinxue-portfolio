'use client'

import React, { useEffect, useState } from 'react'
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
    width: 100%;
    margin-top: 20px;
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

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts')
        if (!res.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }

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
            {posts.map(({ frontmatter }, i) => {
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