import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Chrone Screenshot Studio',
    description: 'Create beautiful Play Store screenshots with phone mockups',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}