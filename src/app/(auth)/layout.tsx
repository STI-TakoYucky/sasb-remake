import "@/styles/globals.css";

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
    <html lang="en" data-theme="light">
      <body className="">
        {children}
        </body>
    </html>
  )
}
