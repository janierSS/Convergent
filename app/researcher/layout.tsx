import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Researcher Profile - Convergent",
  description: "View researcher profile, publications, and expertise",
};

export default function ResearcherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

