'use server'

import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

async function getContentDataRecursive(directory) {
  const results = []
  const fullPath = path.join(contentDirectory, directory)
  const items = await fs.readdir(fullPath)

  for (const item of items) {
    const itemPath = path.join(fullPath, item)
    const stats = await fs.stat(itemPath)

    if (stats.isDirectory()) {
      // If it's a directory, recursively get content from it
      const subDirContent = await getContentDataRecursive(path.join(directory, item))
      results.push(...subDirContent)
    } else if (item.endsWith('.md')) {
      // If it's a markdown file, process it
      const fileContents = await fs.readFile(itemPath, 'utf8')
      const { data: frontmatter, content } = matter(fileContents)
      
      // Convert markdown to HTML
      const processedContent = await remark()
        .use(html)
        .process(content)
      const contentHtml = processedContent.toString()

      results.push({
        frontmatter,
        html: contentHtml,
      })
    }
  }

  // Sort by date if it's jobs or education
  if (directory === 'jobs' || directory === 'education') {
    results.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date)
      const dateB = new Date(b.frontmatter.date)
      return dateB - dateA // Sort in descending order
    })
  }

  return results
}

export async function getContentData(directory) {
  try {
    const fullPath = path.join(contentDirectory, directory)

    // Use recursive function for directories that contain subdirectories with index.md files
    if (directory === 'technologies' || directory === 'jobs' || directory === 'education') {
      return await getContentDataRecursive(directory)
    }

    const fileNames = await fs.readdir(fullPath)
    
    const allContentData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md')) // Only process markdown files
        .map(async (fileName) => {
          try {
            const filePath = path.join(fullPath, fileName)
            const fileStats = await fs.stat(filePath)
            
            // Skip if it's a directory
            if (fileStats.isDirectory()) {
              return null
            }
            
            const fileContents = await fs.readFile(filePath, 'utf8')
            const { data: frontmatter, content } = matter(fileContents)
            
            // Convert markdown to HTML
            const processedContent = await remark()
              .use(html)
              .process(content)
            const contentHtml = processedContent.toString()

            return {
              frontmatter,
              html: contentHtml,
            }
          } catch (error) {
            console.error(`Error processing file ${fileName}:`, error)
            return null
          }
        })
    )

    // Filter out any null values from errors
    return allContentData.filter(Boolean)
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error)
    return [] // Return empty array if directory doesn't exist or other errors
  }
}

export async function getAllContent() {
  try {
    const [
      hero,
      about,
      jobs,
      featured,
      projects,
      contact,
      education,
      technologies,
      library
    ] = await Promise.all([
      getContentData('hero'),
      getContentData('about'),
      getContentData('jobs'),
      getContentData('featured'),
      getContentData('projects'),
      getContentData('contact'),
      getContentData('education'),
      getContentData('technologies'),
      getContentData('books')
    ])

    return {
      hero,
      about,
      jobs,
      featured,
      projects,
      contact,
      education,
      technologies,
      library
    }
  } catch (error) {
    console.error('Error getting all content:', error)
    // Return empty arrays for all sections in case of error
    return {
      hero: [],
      about: [],
      jobs: [],
      featured: [],
      projects: [],
      contact: [],
      education: [],
      technologies: [],
      library: []
    }
  }
} 