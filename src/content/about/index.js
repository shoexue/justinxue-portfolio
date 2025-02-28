export const aboutContent = {
  title: 'about ()',
  avatar: '/headshot.png',
  content: [
    {
      type: 'text',
      content: "What's up!"
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', content: "I'm a student at the " },
        { type: 'link', content: 'University of Toronto', url: 'https://www.utoronto.ca/' },
        { type: 'text', content: ' with a Computer Science Specialist and Mathematics Major.' }
      ]
    },
    {
      type: 'text',
      content: 'A bit about me:'
    },
    {
      type: 'list',
      items: [
        {
          type: 'listItem',
          content: [
            { type: 'text', content: "I'm currently working as a Software Engineer intern on the AI/ML team at " },
            { type: 'link', content: 'Seismic', url: 'https://seismic.com/' },
            { type: 'text', content: '.' }
          ]
        },
        {
          type: 'listItem',
          content: "I'm interested in a lot of topics such as HCI (Human-Computer Interaction) and AI Agents!"
        },
        {
          type: 'listItem',
          content: "I love coffee (I've been to nearly 100 coffee shops in Toronto)."
        },
        {
          type: 'listItem',
          content: "I'm also an avid reader. My favourite authors are Donna Tartt and Elif Shafak!"
        }
      ]
    }
  ]
}

export default aboutContent 