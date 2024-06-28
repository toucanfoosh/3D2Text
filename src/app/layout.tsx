import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3D2Text",
  description: "Convert 3D models to topological text",
  metadataBase: new URL("https://3d2text.com/"),
  openGraph: {
    title: "3D2Text",
    description: "Convert 3D models to topological text",
    type: "website",
    url: "https://3d2text.com/",
    locale: "en_US",
    siteName: "Daniel Wu",
    images: [
      {
        url: new URL(
          "https://cdn.discordapp.com/attachments/959320945133248512/1256084821646774414/opengraph-image.png?ex=667f7ba6&is=667e2a26&hm=f9c95ad587accdc2d6116abf4f9d5b54522c41902e9e255560663219c62ae60b&"
        ),
        alt: 'A black square containing the phrase "3D2Text" with the "3D" being white and the "2Text" being green',
        type: "image/png",
        width: 872,
        height: 872,
      },
    ],
  },
  twitter: {
    card: "app",
    creator: "@toucanfoosh",
    description: "Convert 3D models to topological text",
    images: {
      url: new URL(
        "https://cdn.discordapp.com/attachments/959320945133248512/1256084821646774414/opengraph-image.png?ex=667f7ba6&is=667e2a26&hm=f9c95ad587accdc2d6116abf4f9d5b54522c41902e9e255560663219c62ae60b&"
      ),
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
