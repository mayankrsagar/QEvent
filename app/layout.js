import './globals.css';

import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import Header from '@/components/Header';
import SessionWrapper from '@/components/SessionWrapper';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QEvent",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Header />
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
