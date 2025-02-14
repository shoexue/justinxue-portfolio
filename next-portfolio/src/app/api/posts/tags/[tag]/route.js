import { NextResponse } from 'next/server'
import { getContentData } from '@/lib/data'

export async function GET(request, { params }) {
  try {
    const posts = await getContentData('blog')
    const filteredPosts = posts.filter(post => 
      post.frontmatter.tags && post.frontmatter.tags.includes(params.tag)
    )

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