import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "EnterpriseChai - AI GTM Platform | LoopX Sales Research Tool",
  description:
    "Turn research into revenue with LoopX. The AI sales workspace that helps you qualify leads faster, work smarter, and stay in control.",
  keywords: "AI sales, lead qualification, sales research, GTM platform, sales automation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.className} antialiased`}>{children}</body>
    </html>
  )
}
