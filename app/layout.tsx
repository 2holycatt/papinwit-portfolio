import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import '../styles/scrollIndicator.css';
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
import 'devicon/devicon.min.css';
// import { Theme } from "@radix-ui/themes";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// const iceberg = Iceberg({
//   weight: '400',
//   subsets: ["latin"],
// });

const inter = Inter({
  weight: '400',
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter', // ชื่อตัวแปร CSS ที่ Tailwind จะใช้
// })
export const metadata: Metadata = {
  title: "Papinwit Portfolio",
  description: "Developed by Papinwit Simawan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        {/* เพิ่มลิงก์ของ Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <body className={`${inter.className} font-sans antialiased`}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
