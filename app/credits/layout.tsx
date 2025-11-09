import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credits - Convergent",
  description: "Simple, transparent credit-based pricing for connecting with researchers and institutions",
};

export default function CreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

