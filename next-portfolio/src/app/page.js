import { getAllContent } from '../lib/data'
import ClientPage from './client-page'

export default async function Page() {
  const data = await getAllContent()
  return <ClientPage data={data} />
} 