import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Authors & Institutions - Convergent",
  description: "Find and connect with leading authors and institutions for R&D collaborations",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

