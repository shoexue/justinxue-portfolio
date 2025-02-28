'use client'

import dynamic from 'next/dynamic'
import Loader from '../components/loader'

// Dynamically import the client components with no SSR
const ClientPage = dynamic(() => import('./client-page'), {
  ssr: false,
  loading: () => <Loader />
})

export default function ClientRoot() {
  return <ClientPage />
} 