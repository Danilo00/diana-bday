import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lettere per Diana 🎁",
  description: "Un regalo speciale per il compleanno di Diana",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <meta name="theme-color" content="#ff6b9d" />
      </head>
      <body>{children}</body>
    </html>
  );
}
