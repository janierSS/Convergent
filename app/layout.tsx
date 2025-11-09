import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import { DemoRoleProvider } from "@/contexts/DemoRoleContext";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-darker-grotesque",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://convergent.ai"),
  title: {
    default: "Convergent - Connect with Research Experts",
    template: "%s | Convergent",
  },
  description:
    "AI-powered platform connecting tech companies with university researchers for high-impact R&D collaborations. Find your research partner in minutes.",
  keywords: [
    "research collaboration",
    "university researchers",
    "R&D partnerships",
    "academic collaboration",
    "technology transfer",
    "innovation",
  ],
  authors: [{ name: "Convergent" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://convergent.ai",
    siteName: "Convergent",
    title: "Convergent - Connect with Research Experts",
    description:
      "AI-powered platform connecting tech companies with university researchers for high-impact R&D collaborations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Convergent Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convergent - Connect with Research Experts",
    description:
      "AI-powered platform connecting tech companies with university researchers for high-impact R&D collaborations.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={darkerGrotesque.className}>
        <DemoRoleProvider>{children}</DemoRoleProvider>
      </body>
    </html>
  );
}

