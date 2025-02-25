import { NextResponse } from 'next/server'
import { getContentData } from '@/lib/data'

export async function GET() {
  try {
    const posts = await getContentData('blog')
    
    // Sort posts by date in descending order
    posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date)
      const dateB = new Date(b.frontmatter.date)
      return dateB - dateA
    })

    return new NextResponse(JSON.stringify(posts), {
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