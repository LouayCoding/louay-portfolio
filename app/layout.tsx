import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sofiaPro = localFont({
  src: [
    {
      path: '../public/fonts/Sofia Pro Light Az.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Sofia Pro Regular Az.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Sofia Pro Medium Az.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Sofia Pro Semi Bold Az.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Sofia Pro Bold Az.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sofia-pro',
});

export const metadata: Metadata = {
  title: "LOUAY - The Digital Universe",
  description: "A cinematic journey through code, logic, and creation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Safari browser bar color */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
      </head>
      <body
        className={`${sofiaPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
