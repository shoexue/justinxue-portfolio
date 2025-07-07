import StyledComponentsRegistry from '../lib/registry'

export const metadata = {
  title: 'Justin Xue',
  description: 'Welcome to my personal website!',
  metadataBase: new URL('https://justinxue.dev'),
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  keywords: ['Justin Xue', 'Software Engineer', 'Web Developer', 'Portfolio', 'Full Stack Developer', 'Software Development', 'Justin Xue Portfolio', 'Justin Xue Website', 'Justin Xue Personal Website', 'University of Toronto'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Justin Xue',
    description: 'Welcome to my personal website!',
    url: 'https://justinxue.dev',
    siteName: 'Justin Xue\'s Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Justin Xue Portfolio'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Xue',
    description: 'Welcome to my personal website!',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://justinxue.dev'
  },
  verification: {
    google: 'add-your-google-site-verification-here', 
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://justinxue.dev" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="701337a8-5778-46fc-ae34-5e0eadbcb774"></script>
        <style>{`
          :root {
            --darkBg: #101010;
            --bg: #161616;
            --lightGray: #1f1f1f;
            --lightestGray: #343434;
            --slate: #B2BBD3;
            --lightSlate: #D0D5E1;
            --lightestSlate: #E7F0F7;
            --white: #EDFAFF;
            --green: #8FFF5A;
          }
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            max-width: 100%;
          }

          html {
            scroll-behavior: smooth;
          }
          
          body {
            margin: 0;
            padding: 0 1rem;
            background-color: var(--darkBg);
            color: var(--slate);
            font-family: Poppins, sans-serif;
            min-height: 100vh;
            line-height: 1.5;
            overflow-x: hidden;
            max-width: 100%;
            width: 100%;
          }

          #__next {
            min-height: 100vh;
            max-width: 100%;
          }

          main {
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
          }

          h1, h2, h3, h4, h5, h6 {
            color: var(--white);
            font-family: Poppins, sans-serif;
          }

          a {
            text-decoration: none;
            color: var(--green);
            transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
          }

          a:hover {
            color: var(--green);
          }
        `}</style>
      </head>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
} 