import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3D2Text",
  description: "Convert 3D models to 2d text representations",
  metadataBase: new URL("https://3d2text.com/"),
  openGraph: {
    title: "3D2Text",
    description: "Convert 3D models to 2d text representations",
    type: "website",
    url: "https://3d2text.com/",
    locale: "en_US",
    siteName: "Daniel Wu",
    images: [
      {
        url: new URL("https://ibb.co/Gc1ZZJd"),
        alt: 'A black square containing the phrase "3D2Text" with the "3D" being white and the "2Text" being green',
        type: "image/png",
        width: 872,
        height: 872,
      },
    ],
  },
  twitter: {
    card: "summary",
    creator: "@toucanfoosh",
    description: "Convert 3D models to 2d text representations",
    images: {
      url: new URL("https://ibb.co/Gc1ZZJd"),
      alt: 'A black square containing the phrase "3D2Text" with the "3D" being white and the "2Text" being green',
      type: "image/png",
      width: 872,
      height: 872,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
