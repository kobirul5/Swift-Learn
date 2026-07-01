'use client';

import UserProfileCard from "@/components/UserProfileCard";
import Image from "next/image";
import Link from "next/link";
import { useGetUserQuery } from "@/redux/api/userApi";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiSettings,
  FiStar,
  FiHelpCircle,
  FiMail,
  FiBriefcase,
  FiMessageSquare,
} from "react-icons/fi";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <FiHome /> },
  { name: "Courses", href: "/admin/dashboard/courses", icon: <FiBook /> },
  { name: "Students", href: "/admin/dashboard/students", icon: <FiUsers /> },
  { name: "Instructors", href: "/admin/dashboard/instructors", icon: <FiBriefcase /> },
  { name: "Testimonials", href: "/admin/dashboard/testimonials", icon: <FiStar /> },
  { name: "FAQs", href: "/admin/dashboard/faqs", icon: <FiHelpCircle /> },
  { name: "Messages", href: "/admin/dashboard/messages", icon: <FiMail /> },
  { name: "Support Chat", href: "/admin/dashboard/support-chat", icon: <FiMessageSquare /> },
  { name: "Settings", href: "/admin/dashboard/settings", icon: <FiSettings /> },
];

interface DashboardSidebarProps {
  isOpen: boolean;
}

export default function DashboardSidebar({ isOpen }: DashboardSidebarProps) {
  const { data } = useGetUserQuery(undefined);
  const user = data?.data;

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-dark-200 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto overflow-x-hidden">
        {/* Logo */}
        <div className="flex items-center shrink-0 px-4 mb-2">
          <Link
            href="/"
            className="text-2xl font-bold text-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Image src="/logo/logo.png" alt="logo" width={30} height={30} className="shrink-0" />
            <span
              className={`transition-all duration-300 ${
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              SwiftLearn
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              title={!isOpen ? item.name : undefined}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-dark-600 hover:bg-dark-50 hover:text-dark-900 whitespace-nowrap overflow-hidden"
            >
              <span className="shrink-0 text-lg">{item.icon}</span>
              <span
                className={`ml-3 transition-all duration-300 ${
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="shrink-0 flex border-t border-dark-200 p-4 overflow-hidden">
        <Link href="/profile" className="w-full">
          {isOpen ? (
            <UserProfileCard />
          ) : (
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden border border-gray-200">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="profile"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-primary-600 font-bold text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
              </div>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
