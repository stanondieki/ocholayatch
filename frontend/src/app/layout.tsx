import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/components/AppProvider'

export const metadata: Metadata = {
  title: 'Ochola Yachts',
  description: 'Luxury Yacht Booking with Crypto Wallet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
