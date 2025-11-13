import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

const cabinetGrotesk = localFont({
  src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet-grotesk",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Living Works - Creative × Connection × Capital",
  description: "LivingWorks. Where Capability and Courage meets Capital. Where Mastery meets Means. Where the Bold meets true Believers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cabinetGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

