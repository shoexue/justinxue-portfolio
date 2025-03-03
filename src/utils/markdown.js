import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getContentData = (section) => {
  const contentDirectory = path.join(process.cwd(), 'src', 'content', section, '_content')
  const filePath = path.join(contentDirectory, `${section}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  
  // Special handling for featured section
  if (section === 'featured') {
    const featured = data.featured.map(projectId => {
      const projectPath = path.join(contentDirectory, `${projectId}.md`)
      const projectContent = fs.readFileSync(projectPath, 'utf8')
      const { data: projectData, content } = matter(projectContent)
      
      // Process markdown content
      const contentParts = content.trim().split('\n\n').filter(Boolean)
      const processedContent = contentParts.map(part => {
        // Check if the part contains a markdown link
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
        if (linkMatch) {
          const beforeLink = part.substring(0, part.indexOf('['))
          const afterLink = part.substring(part.indexOf(')') + 1)
          return {
            type: 'text',
            content: beforeLink,
            link: {
              text: linkMatch[1],
              url: linkMatch[2]
            },
            afterLink: afterLink
          }
        }
        return part
      })

      return {
        ...projectData,
        content: processedContent
      }
    })

    return {
      title: data.title,
      featured: featured.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }

  // Special handling for projects section
  if (section === 'projects') {
    const projects = data.projects.map(projectId => {
      const projectPath = path.join(contentDirectory, `${projectId}.md`)
      const projectContent = fs.readFileSync(projectPath, 'utf8')
      const { data: projectData, content } = matter(projectContent)
      
      // Process markdown content
      const contentParts = content.trim().split('\n\n').filter(Boolean)
      const processedContent = contentParts.map(part => {
        // Check if the part contains a markdown link
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
        if (linkMatch) {
          const beforeLink = part.substring(0, part.indexOf('['))
          const afterLink = part.substring(part.indexOf(')') + 1)
          return {
            type: 'text',
            content: beforeLink,
            link: {
              text: linkMatch[1],
              url: linkMatch[2]
            },
            afterLink: afterLink
          }
        }
        return part
      })

      return {
        title: projectData.title,
        github: projectData.github,
        external: projectData.external,
        tech: projectData.tech,
        content: processedContent[0] || ''
      }
    })

    return projects.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  
  // Special handling for about section to include markdown content
  if (section === 'about') {
    const { content } = matter(fileContents)
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

export const getJobsData = () => {
  const contentDirectory = path.join(process.cwd(), 'src', 'content', 'jobs', '_content')
  const mainFilePath = path.join(contentDirectory, 'jobs.md')
  const { data: mainData } = matter(fs.readFileSync(mainFilePath, 'utf8'))
  
  const jobs = mainData.companies.map(company => {
    const companyFilePath = path.join(contentDirectory, `${company}.md`)
    const { data: jobData, content } = matter(fs.readFileSync(companyFilePath, 'utf8'))
    
    // Handle jobs with multiple roles (like UTMIST)
    if (jobData.roles) {
      return {
        company: jobData.company,
        roles: jobData.roles.map(role => ({
          ...role,
          content: role.content.map(item => {
            if (typeof item === 'string') {
              // Check if the string contains a markdown link
              const linkMatch = item.match(/\[(.*?)\]\((.*?)\)/)
              if (linkMatch) {
                const beforeLink = item.substring(0, item.indexOf('['))
                const afterLink = item.substring(item.indexOf(')') + 1)
                return {
                  type: 'text',
                  content: beforeLink,
                  link: {
                    text: linkMatch[1],
                    url: linkMatch[2]
                  },
                  afterLink: afterLink
                }
              }
              return item
            }
            return item
          })
        }))
      }
    }
    
    // Handle single role jobs
    const processedContent = content.split('\n')
      .filter(line => line.trim() && line.trim().startsWith('-'))
      .map(line => {
        line = line.replace(/^- /, '').trim()
        const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/)
        if (linkMatch) {
          const beforeLink = line.substring(0, line.indexOf('['))
          const afterLink = line.substring(line.indexOf(')') + 1)
          return {
            type: 'text',
            content: beforeLink,
            link: {
              text: linkMatch[1],
              url: linkMatch[2]
            },
            afterLink: afterLink
          }
        }
        return line
      })

    return {
      company: jobData.company,
      roles: [{
        title: jobData.title,
        location: jobData.location,
        range: jobData.range,
        content: processedContent
      }]
    }
  })

  return {
    title: mainData.title,
    jobs: jobs
  }
}

export const getAllContent = () => {
  const sections = ['hero', 'about', 'technologies', 'featured', 'projects', 'contact']
  const content = {}

  sections.forEach(section => {
    content[section] = getContentData(section)
  })

  // Handle education separately
  content.education = getEducationData()

  // Handle jobs separately
  content.jobs = getJobsData()

  return content
} 