import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getContentData(directory) {
  const fullPath = path.join(contentDirectory, directory)
  const fileNames = await fs.promises.readdir(fullPath)
  
  const allContentData = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(fullPath, fileName)
      const fileContents = await fs.promises.readFile(filePath, 'utf8')
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
    })
  )

  return allContentData
}

export async function getAllContent() {
  const hero = await getContentData('hero')
  const about = await getContentData('about')
  const jobs = await getContentData('jobs')
  const featured = await getContentData('featured')
  const projects = await getContentData('projects')
  const contact = await getContentData('contact')
  const education = await getContentData('education')
  const technologies = await getContentData('technologies')
  const library = await getContentData('books')

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
} 