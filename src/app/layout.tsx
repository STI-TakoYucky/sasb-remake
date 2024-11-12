import "@/styles/globals.css";
import { UserContextComponent } from "@/components";

export const metadata = {
  title: "SASB",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //this layout acts as a global state
  return (
    <>
      <UserContextComponent>{children}</UserContextComponent>
    </>
  );
}