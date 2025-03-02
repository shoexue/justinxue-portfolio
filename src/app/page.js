import ClientPage from './client-page'
import { getAllContent } from '../utils/markdown'

export default function Page() {
  // Get content on the server side
  const content = getAllContent()
  
  // Pass content as props to the client component
  return <ClientPage initialContent={content} />
} 