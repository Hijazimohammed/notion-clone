import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notion',
  description:
    "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team",
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={inter.className}
        data-new-gr-c-s-check-loaded='14.1207.0'
        data-gr-ext-installed=''
        cz-shortcut-listen='true'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='notion-theme'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
