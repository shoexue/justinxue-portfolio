import { NextResponse } from 'next/server'
import { getAllContent } from '../../../lib/data'

export async function GET() {
  try {
    const content = await getAllContent()
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
} 