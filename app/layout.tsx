// ./app/layout.js

// app/layout.tsx
import { Analytics } from "@vercel/analytics/react"
import { fonts } from './fonts'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' className={fonts.rubik.variable}>
      <body style={{ backgroundColor: 'White' }}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

