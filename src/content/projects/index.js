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

export default projectsContent 