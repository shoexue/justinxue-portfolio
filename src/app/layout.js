import StyledComponentsRegistry from '../lib/registry'

export const metadata = {
  title: 'Alvina Yang',
  description: 'Personal Portfolio',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
} 