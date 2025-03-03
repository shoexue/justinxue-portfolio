'use client'

import dynamic from 'next/dynamic'

const ClientPage = dynamic(() => import('../app/client-page'), {
  ssr: false
})

export default function DynamicClientPage({ initialContent }) {
  return <ClientPage initialContent={initialContent} />
} 