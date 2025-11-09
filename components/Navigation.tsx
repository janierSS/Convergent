"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoRole, UserRole } from "@/contexts/DemoRoleContext";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, UserCircleIcon, BuildingOfficeIcon, ShieldCheckIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const pathname = usePathname();
  const { role, setRole } = useDemoRole();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setIsDropdownOpen(false);
  };

  const roleConfig = {
    company: {
      label: "Company",
      icon: BuildingOfficeIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "View as a company seeking researchers",
    },
    faculty: {
      label: "Faculty",
      icon: UserCircleIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "View as faculty seeking partnerships",
    },
    admin: {
      label: "Admin",
      icon: ShieldCheckIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "View all content and features",
    },
  };

  const currentRole = roleConfig[role];
  const CurrentRoleIcon = currentRole.icon;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-chime bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
              Convergent
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className={`text-base xl:text-lg font-medium transition-colors ${
                isActive("/")
                  ? "text-chime-teal"
                  : "text-gray-600 hover:text-chime-teal"
              }`}
            >
              Home
            </Link>
            <Link
              href="/search?q=artificial%20intelligence&category=authors"
              className={`text-base xl:text-lg font-medium transition-colors ${
                pathname?.startsWith("/search")
                  ? "text-chime-teal"
                  : "text-gray-600 hover:text-chime-teal"
              }`}
            >
              Search
            </Link>
            <Link
              href="/credits"
              className={`text-base xl:text-lg font-medium transition-colors ${
                isActive("/credits")
                  ? "text-chime-teal"
                  : "text-gray-600 hover:text-chime-teal"
              }`}
            >
              Credits
            </Link>

            {/* Role Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg ${currentRole.bgColor} ${currentRole.color} font-semibold transition-all hover:shadow-md`}
              >
                <CurrentRoleIcon className="w-4 xl:w-5 h-4 xl:h-5" />
                <span className="text-sm xl:text-base">Demo: {currentRole.label}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Select Demo Role
                    </div>
                    {Object.entries(roleConfig).map(([key, config]) => {
                      const Icon = config.icon;
                      const isCurrentRole = key === role;
                      return (
                        <button
                          key={key}
                          onClick={() => handleRoleChange(key as UserRole)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            isCurrentRole
                              ? `${config.bgColor} ${config.color}`
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isCurrentRole ? config.color : "text-gray-400"}`} />
                          <div className="flex-1">
                            <div className="font-semibold text-base">{config.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {config.description}
                            </div>
                          </div>
                          {isCurrentRole && (
                            <div className={`w-2 h-2 rounded-full ${config.color.replace("text-", "bg-")}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-chime-teal transition-colors"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  isActive("/")
                    ? "text-chime-teal"
                    : "text-gray-600 hover:text-chime-teal"
                }`}
              >
                Home
              </Link>
              <Link
                href="/search?q=artificial%20intelligence&category=authors"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  pathname?.startsWith("/search")
                    ? "text-chime-teal"
                    : "text-gray-600 hover:text-chime-teal"
                }`}
              >
                Search
              </Link>
              <Link
                href="/credits"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  isActive("/credits")
                    ? "text-chime-teal"
                    : "text-gray-600 hover:text-chime-teal"
                }`}
              >
                Credits
              </Link>

              {/* Mobile Role Selector */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                  Demo Role
                </p>
                {Object.entries(roleConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  const isCurrentRole = key === role;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        handleRoleChange(key as UserRole);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-left transition-colors ${
                        isCurrentRole
                          ? `${config.bgColor} ${config.color}`
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isCurrentRole ? config.color : "text-gray-400"}`} />
                      <div className="flex-1">
                        <div className="font-semibold text-base">{config.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {config.description}
                        </div>
                      </div>
                      {isCurrentRole && (
                        <div className={`w-2 h-2 rounded-full ${config.color.replace("text-", "bg-")}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

