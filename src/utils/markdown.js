import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getContentData = (section) => {
  const contentDirectory = path.join(process.cwd(), 'src', 'content', section, '_content')
  const filePath = path.join(contentDirectory, `${section}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // Special handling for about section to include markdown content
  if (section === 'about') {
    const contentLines = content.trim().split('\n')
    const parsedContent = []
    let currentList = null
    
    contentLines.forEach(line => {
      const trimmedLine = line.trim()
      if (!trimmedLine) return

      // Handle headers
      if (trimmedLine.startsWith('#')) {
        const level = trimmedLine.match(/^#+/)[0].length
        const headerContent = trimmedLine.slice(level).trim()
        parsedContent.push({
          type: 'heading',
          level,
          content: headerContent
        })
        return
      }

      if (trimmedLine.startsWith('- ')) {
        if (!currentList) {
          currentList = {
            type: 'list',
            items: []
          }
          parsedContent.push(currentList)
        }
        
        const listItemContent = trimmedLine.slice(2)
        if (listItemContent.includes('[')) {
          const parts = []
          let currentText = ''
          let i = 0
          
          while (i < listItemContent.length) {
            if (listItemContent[i] === '[') {
              if (currentText.trim()) {
                parts.push({ type: 'text', content: currentText.trim() + ' ' })
              }
              currentText = ''
              const linkEnd = listItemContent.indexOf(']', i)
              const urlStart = listItemContent.indexOf('(', linkEnd)
              const urlEnd = listItemContent.indexOf(')', urlStart)
              
              parts.push({
                type: 'link',
                content: listItemContent.slice(i + 1, linkEnd),
                url: listItemContent.slice(urlStart + 1, urlEnd)
              })
              
              i = urlEnd + 1
            } else {
              currentText += listItemContent[i]
              i++
            }
          }
          
          if (currentText.trim()) {
            parts.push({ type: 'text', content: ' ' + currentText.trim() })
          }
          
          currentList.items.push({ content: parts })
        } else {
          currentList.items.push({ content: listItemContent })
        }
      } else {
        currentList = null
        
        if (trimmedLine.includes('[')) {
          const parts = []
          let currentText = ''
          let i = 0
          
          while (i < trimmedLine.length) {
            if (trimmedLine[i] === '[') {
              if (currentText.trim()) {
                parts.push({ type: 'text', content: currentText.trim() + ' ' })
              }
              currentText = ''
              const linkEnd = trimmedLine.indexOf(']', i)
              const urlStart = trimmedLine.indexOf('(', linkEnd)
              const urlEnd = trimmedLine.indexOf(')', urlStart)
              
              parts.push({
                type: 'link',
                content: trimmedLine.slice(i + 1, linkEnd),
                url: trimmedLine.slice(urlStart + 1, urlEnd)
              })
              
              i = urlEnd + 1
            } else {
              currentText += trimmedLine[i]
              i++
            }
          }
          
          if (currentText.trim()) {
            parts.push({ type: 'text', content: ' ' + currentText.trim() })
          }
          
          parsedContent.push({
            type: 'paragraph',
            content: parts
          })
        } else {
          parsedContent.push({
            type: 'text',
            content: trimmedLine
          })
        }
      }
    })
    
    return {
      ...data,
      content: parsedContent
    }
  }
  
  return data
}

export const getEducationData = () => {
  const contentDirectory = path.join(process.cwd(), 'src', 'content', 'education', '_content')
  const mainFilePath = path.join(contentDirectory, 'education.md')
  const { data: mainData } = matter(fs.readFileSync(mainFilePath, 'utf8'))
  
  const schools = mainData.schools.map(school => {
    const schoolFilePath = path.join(contentDirectory, `${school}.md`)
    const { data: schoolData } = matter(fs.readFileSync(schoolFilePath, 'utf8'))
    return schoolData
  })

  return {
    title: mainData.title,
    education: schools.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}

export const getAllContent = () => {
  const sections = ['hero', 'about', 'technologies', 'jobs', 'featured', 'projects', 'contact']
  const content = {}

  sections.forEach(section => {
    content[section] = getContentData(section)
  })

  // Handle education separately
  content.education = getEducationData()

  return content
} 