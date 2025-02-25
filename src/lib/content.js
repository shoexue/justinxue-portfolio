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

export const technologiesContent = [
  {
    title: 'front-end',
    content: "I enjoy making dynamic websites and applications that are also fun to look at! These are the technologies I like to use:",
    technologies: [
      'React',
      'Flutter/Dart',
      'three.js',
      'Tailwind CSS'
    ]
  },
  {
    title: 'languages',
    content: "I am familar with these programming languages:",
    technologies: [
      'Python',
      'Java',
      'C',
      'C++',
      'Assembly',
      'JavaScript',
      'SQL',
      'HTML/CSS',
      'Bash'
    ]
  },
  {
    title: 'machine learning',
    content: "I have experience training my own ML models and creating agentic workflows!! Here's what I use:",
    technologies: [
      'TensorFlow',
      'Pytorch',
      'OpenCV',
      'Keras',
      'LangChain',
      'LlamaIndex'
    ]
  }
]

export const heroContent = {
  title: 'print("hello world!")',
  name: "I'm Alvina.",
  subtitle: '... and i can somewhat code :)'
}

export const jobsContent = [
  {
    date: '2024-10-02',
    title: 'Student Researcher',
    company: 'University of Toronto',
    location: 'Toronto, ON, Canada',
    range: 'October 2024 - Present',
    content: [
      "Conducted research under Dr. Khai Truong's supervision to develop a software platform designed to train users in conducting interviews for Human-Centered Design",
      'Engineered interactive interview bots leveraging Retrieval-Augmented Generation and GPT-based models to simulate realistic interview scenarios.'
    ]
  },
  {
    date: '2024-09-02',
    title: 'ML Project Lead',
    company: 'UTMIST & Lovelytics',
    location: 'Toronto, ON, Canada',
    range: 'September 2024 - Present',
    content: [
      {
        type: 'text',
        content: 'Led a team of 6 developers in designing LLM-powered a task automation platform in collaboration with ',
        link: {
          text: 'Lovelytics',
          url: 'https://lovelytics.com'
        },
        afterLink: ', enhancing efficiency in job-specific task execution.'
      },
      'Implemented Retrieval-Augmented Generation and DSPy to fine-tune and optimize prompts.',
      'Spearheaded development efforts to ensure adaptability of the platform for diverse use cases.'
    ]
  },
  {
    date: '2024-05-10',
    title: 'Software Development Student',
    company: 'Blackberry QNX',
    location: 'Ottawa, ON, Canada',
    range: 'May 2024 - August 2024',
    content: [
      'Spearheaded development of the QNX VSCode Extension automation tests, reducing manual testing by 100%.',
      'Automated 150+ test cases with Selenium, TypeScript, and ExTester.',
      'Programmed automated testing solutions for the Momentics IDE and the QNX Software Center.'
    ]
  },
  {
    date: '2024-05-02',
    title: 'Undergraduate Researcher',
    company: 'Intelligent Adaptive Interventions Lab',
    location: 'Toronto, ON, Canada / Remote',
    range: 'May 2024 - Present',
    content: [
      'Selected as one of the ROP Students for the Spring/Summer term.',
      {
        type: 'text',
        content: 'Worked on the ',
        link: {
          text: 'ABScribe',
          url: 'https://abtestingtools-frontend.up.railway.app/'
        },
        afterLink: ' project under Ph.D candidate Mohi Reza and Dr. Joseph Williams.'
      },
      'Redesigned the home page using React and Tailwind CSS.',
      'Developped new features such as personalized persuasive messages using GPT-4, JavaScript, and Python.'
    ]
  },
  {
    date: '2025-01-06',
    title: 'Software Engineer Intern',
    company: 'Seismic',
    location: 'Toronto, ON, Canada',
    range: 'January 2025 - April 2025',
    content: [
      'AI/ML Team'
    ]
  }
]

export const educationContent = [
  {
    date: '2022-09-01',
    title: 'Honours Bachelor of Science - Computer Science',
    school: 'University of Toronto - St. George',
    location: 'Toronto, ON',
    range: 'September 2022 - April 2026 (expected)',
    content: [
      'Scholarships: Timothy P. Morton Scholarship ($30,000+)',
      'Specialist: Computer Science',
      'Major: Mathematics'
    ]
  },
  {
    date: '2020-09-01',
    title: 'International Baccalaureate Diploma',
    school: 'Elmwood School',
    location: 'Ottawa, ON',
    range: 'September 2020 - June 2022',
    content: [
      "Awards: Lieutenant Governer's Community Volunteer Award, Merit Pin",
      'Higher Levels: Physics (Level 7), Math (Level 7), Chemistry (Level 7)'
    ]
  }
]

export const featuredContent = [
  {
    date: '2025',
    title: 'Pitch, Please',
    cover: '/featured/PitchPlease.png',
    github: 'https://github.com/whyismynamerudy/pitch-please/tree/main',
    tech: [
      'Python',
      'TypeScript',
      'Next.js',
      'LangChain'
    ],
    showInProjects: true,
    content: [
      "Pitches are a challenging part of every hackathon. After a weekend of sleep-deprived hacking, you're now faced with the task of showcasing all of your work in just a few minutes??? How can you ensure your ideas come across clearly from each judge's perspective??? Introducing Pitch, Please!",
      "🥇 Best use of Databricks @UofTHacks 12!",
      {
        type: 'link',
        text: 'Check out our submission here!',
        url: 'https://dorahacks.io/buidl/21648/'
      }
    ]
  },
  {
    date: '2024',
    title: 'remi',
    cover: '/featured/HelloRemi.png',
    github: 'https://github.com/alvina-yang/HelloRemi',
    tech: [
      'ReactJS',
      'Python',
      'Arduino UNO',
      'three.js'
    ],
    showInProjects: true,
    content: [
      "Remi (remember me) is a web-based application connected to an answering machine. It's purpose is to use reminiscence therapy to strengthen bonds between patients with memory-related challenges and their loved ones.",
      {
        type: 'text',
        content: "🥇 First place in the RBC Category for UofTHacks, winning $1500. Here's the ",
        link: {
          text: 'devpost',
          url: 'https://devpost.com/software/remi-bo5sil'
        },
        afterLink: '!'
      }
    ]
  },
  {
    date: '2026',
    title: 'HackerQuest',
    cover: '/featured/HackerQuest.png',
    github: 'https://github.com/alvina-yang/HackerQuest',
    tech: [
      'AWS',
      'Python',
      'JavaScript',
      'Next.js',
      'Flask',
      'LangChain'
    ],
    showInProjects: true,
    content: [
      "Tired of grinding LeetCode with no results? HackerQuest transforms the interview process with AI-driven mock interviews and live feedback. From coding challenges to behavioral questions, our platform equips job seekers and recruiters with the tools to succeed.",
      {
        type: 'text',
        content: 'Checkout our ',
        link: {
          text: 'Devpost',
          url: 'https://devpost.com/software/hackerquest#updates'
        },
        afterLink: '!'
      }
    ]
  }
]

export const projectsContent = [
  {
    date: '2023',
    title: 'ai playground',
    external: 'https://github.com/CSC207-2023Y-UofT/ai-playground',
    tech: [
      'Java',
      'JavaFX',
      'Deep Java Library (DJL)'
    ],
    showInProjects: true,
    content: {
      type: 'text',
      content: 'An interactive Java-based platform for visualzing neural network decision boundaries which has heavily inspired by the ',
      link: {
        text: 'Tensorflow Playground',
        url: 'https://playground.tensorflow.org'
      },
      afterLink: '. This platform allows for users to customize datasets and adjust paramaters to demonstrate real-time effects on the decision boundary. ... And yes the font is comic sans :)'
    }
  },
  {
    date: '2022-02-02',
    title: 'hate speech detection algorithm',
    github: 'https://github.com/alvina-yang/hateSpeechDetection/',
    tech: [
      'Python',
      'TensorFlow',
      'NumPy',
      'Pandas'
    ],
    showInProjects: true,
    content: 'A classification algorithm created using neural networks to classify text into 3 different categories: offensive, hate speech, or neither with a 96% accuracy.'
  },
  {
    date: '2025',
    title: 'locked in',
    external: 'https://github.com/alvina-yang/LeetcodeLock',
    tech: [
      'Python',
      'TypeScript',
      'RAG',
      'Next.js',
      'Langchain',
      'Flask',
      'Arduino'
    ],
    showInProjects: true,
    content: 'Locked In is a hardware-software hybrid solution that combines physical phone isolation with intelligent study assistance. The system consists of an Arduino-powered box that safely locks your phone away while you study and a web platform delivering personalized Data Structures & Algorithms practice problems.'
  }
]

export const contactContent = {
  title: 'contact ()',
  buttonText: 'email me!',
  content: "Are you interested in any of my projects? Are you curious about my work? Want a good book recommendation?"
}

export const content = {
  hero: heroContent,
  about: aboutContent,
  technologies: technologiesContent,
  jobs: jobsContent,
  education: educationContent,
  featured: featuredContent,
  projects: projectsContent,
  contact: contactContent
} 