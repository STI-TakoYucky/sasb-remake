import "@/styles/globals.css";
import { AdminNavbar } from "@/components/adminComponents";

export const metadata = {
  title: 'SASB',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
