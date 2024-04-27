// ./app/layout.js

export const metadata = {
  title: 'My blog site',
  description: 'A simple blog app project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
