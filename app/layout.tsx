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
        {/* Safari browser bar color - Dark */}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-navbutton-color" content="#000000" />
      </head>
      <body
        className={`${sofiaPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
