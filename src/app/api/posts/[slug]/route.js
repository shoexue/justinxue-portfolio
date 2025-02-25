import { NextResponse } from 'next/server'
import { getContentData } from '@/lib/data'

export async function GET(request, { params }) {
  try {
    const { slug } = params
    const posts = await getContentData('blog')
    const post = posts.find(post => post.frontmatter.slug === slug)

    if (!post) {
      return new NextResponse(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new NextResponse(JSON.stringify(post), {
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