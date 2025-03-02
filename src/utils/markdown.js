import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getContentData = (section) => {
  const contentDirectory = path.join(process.cwd(), 'src', 'content', section, '_content')
  const filePath = path.join(contentDirectory, `${section}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return data
}

export const getAllContent = () => {
  const sections = ['hero', 'about', 'technologies', 'jobs', 'education', 'featured', 'projects', 'contact']
  const content = {}

  sections.forEach(section => {
    content[section] = getContentData(section)
  })

  return content
} 