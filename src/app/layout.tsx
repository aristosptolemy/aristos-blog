import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import styles from './layout.module.css'
import Header from '@header/Header'
import Side from '@side/Side'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aristosブログ",
  description: "適当にやっていきます",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <Header/>
          <div className={styles.mains}>
            <Side/>
            <main className={styles.main}>{children}</main>
          </div>
        
        </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
