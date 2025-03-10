import "@/styles/globals.css";
import Navbar from "../../../components/Navbar"
import Preloader from '../../../components/Preloader'
import Footer from '@/components/Footer'
import ProtectedRoutes from "@/components/ProtectedRoutes";

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
          <ProtectedRoutes>
            <Preloader></Preloader> 
            <Navbar></Navbar>
            {children}
          </ProtectedRoutes>
      </body>
    </html>
  )
}
