import "@/styles/globals.css";
import Navbar from "../../components/Navbar"
import Preloader from '../../components/Preloader'
import Footer from '@/components/Footer'

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
          <Preloader></Preloader> 
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
      </body>
    </html>
  )
}