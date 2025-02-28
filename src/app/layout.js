import StyledComponentsRegistry from '../lib/registry'

export const metadata = {
  title: 'Alvina Yang',
  description: 'Personal Portfolio',
  metadataBase: new URL('https://alvinayang.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Alvina Yang',
    description: 'Personal Portfolio',
    url: 'https://alvinayang.com',
    siteName: 'Alvina Yang',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://alvinayang.com" />
        <style>{`
          :root {
            --navy: #0a192f;
            --light-navy: #112240;
            --lightest-navy: #233554;
            --slate: #8892b0;
            --light-slate: #a8b2d1;
            --lightest-slate: #ccd6f6;
            --white: #e6f1ff;
            --green: #64ffda;
          }
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          html {
            scroll-behavior: smooth;
          }
          
          body {
            margin: 0;
            padding: 0;
            background-color: var(--navy);
            color: var(--slate);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            min-height: 100vh;
            line-height: 1.5;
            overflow-x: hidden;
          }

          #__next {
            min-height: 100vh;
          }

          h1, h2, h3, h4, h5, h6 {
            color: var(--lightest-slate);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }

          a {
            text-decoration: none;
            color: var(--green);
            transition: all 0.25s ease;
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