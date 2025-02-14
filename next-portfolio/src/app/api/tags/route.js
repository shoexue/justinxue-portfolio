import { NextResponse } from 'next/server'
import { getContentData } from '@/lib/data'

export async function GET() {
  try {
    const posts = await getContentData('blog')
    
    // Create a map to count occurrences of each tag
    const tagMap = new Map()
    
    posts.forEach(post => {
      const { tags } = post.frontmatter
      if (tags) {
        tags.forEach(tag => {
          const count = tagMap.get(tag) || 0
          tagMap.set(tag, count + 1)
        })
      }
    })
    
    // Convert map to array of objects with name and count
    const tags = Array.from(tagMap.entries()).map(([name, count]) => ({
      name,
      count,
    }))
    
    // Sort tags alphabetically
    tags.sort((a, b) => a.name.localeCompare(b.name))

    return new NextResponse(JSON.stringify(tags), {
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