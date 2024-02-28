import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BoardContextComponent from "@/components/BoardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My test project for incodeGroup",
  description: "It's some of variation toDo list with dnd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <BoardContextComponent>{children}</BoardContextComponent>
      </body>
    </html>
  );
}
