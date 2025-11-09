"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "company" | "faculty" | "admin";

interface DemoRoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const DemoRoleContext = createContext<DemoRoleContextType | undefined>(undefined);

export function DemoRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("company");

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("demo-role") as UserRole;
    if (savedRole === "company" || savedRole === "faculty" || savedRole === "admin") {
      setRoleState(savedRole);
    }
  }, []);

  // Save role to localStorage when it changes
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("demo-role", newRole);
  };

  return (
    <DemoRoleContext.Provider value={{ role, setRole }}>
      {children}
    </DemoRoleContext.Provider>
  );
}

export function useDemoRole() {
  const context = useContext(DemoRoleContext);
  if (context === undefined) {
    throw new Error("useDemoRole must be used within a DemoRoleProvider");
  }
  return context;
}

