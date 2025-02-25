import { NextResponse } from 'next/server'
import { getContentData } from '@/lib/data'

export async function GET(request, { params }) {
  try {
    const { tag } = params
    const posts = await getContentData('blog')
    
    // Filter posts by tag
    const filteredPosts = posts.filter(post => {
      const { tags } = post.frontmatter
      return tags && tags.includes(tag)
    })
    
    // Sort posts by date in descending order
    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date)
      const dateB = new Date(b.frontmatter.date)
      return dateB - dateA
    })

    return new NextResponse(JSON.stringify(filteredPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
} 