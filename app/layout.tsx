import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Sri Chandana Purella | Data, AI & Cloud Engineer",
  description:
    "Data, AI and Cloud Engineer building reliable data platforms, GenAI applications, and cloud-native automation.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Sri Chandana Purella | Data, AI & Cloud Engineer",
    description: "Cloud data pipelines, AI-ready platforms, GenAI assistants, and analytics workflows.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${space.variable}`}>{children}</body>
    </html>
  );
}
