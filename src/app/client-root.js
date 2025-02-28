'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Loader from '../components/loader'

// Dynamically import the client components with no SSR
const ClientPage = dynamic(() => import('./client-page'), {
  ssr: false,
  loading: () => null // We'll handle loading state ourselves
})

export default function ClientRoot() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <Loader finishLoading={() => setIsLoading(false)} />}
      <ClientPage />
    </>
  )
} 