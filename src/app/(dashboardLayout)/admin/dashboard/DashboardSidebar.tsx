'use client';

import UserProfileCard from "@/components/UserProfileCard";
import Image from "next/image";
import Link from "next/link";
import { useGetUserQuery } from "@/redux/api/userApi";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const { data } = useGetUserQuery(undefined);
  const user = data?.data;

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-gray-100 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden transition-all duration-300 ease-in-out shadow-sm select-none ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center shrink-0 px-5 h-20 border-b border-gray-100/80">
        <Link
          href="/"
          className="flex items-center gap-3 whitespace-nowrap focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 shadow-inner group transition-transform duration-300 hover:scale-105 shrink-0">
            <Image 
              src="/logo/logo.png" 
              alt="logo" 
              width={26} 
              height={26} 
              className="shrink-0 transition-transform duration-300 group-hover:rotate-12" 
            />
          </div>
          <span
            className={`font-bold text-xl bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent tracking-tight transition-all duration-300 ${
              isOpen ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 overflow-hidden"
            }`}
          >
            SwiftLearn
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto overflow-x-hidden scrollbar-none">
        <nav className="px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                title={!isOpen ? item.name : undefined}
                className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap overflow-hidden focus:outline-none ${
                  isActive
                    ? "bg-primary-50 text-primary-700 shadow-sm shadow-primary-100/30"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {/* Active Left Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r bg-primary-600" />
                )}

                {/* Icon */}
                <span className={`shrink-0 text-xl transition-transform duration-200 ${
                  isActive ? "text-primary-600 scale-110" : "text-gray-400 group-hover:text-gray-600 group-hover:scale-105"
                }`}>
                  {item.icon}
                </span>

                {/* Menu Text */}
                <span
                  className={`ml-4 transition-all duration-300 font-medium ${
                    isOpen ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 overflow-hidden"
                  } ${isActive ? "font-semibold" : ""}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="shrink-0 p-4 border-t border-gray-100/80 bg-white/70 backdrop-blur-sm">
        <Link href="/profile" className="block focus:outline-none">
          {isOpen ? (
            <div className="p-1.5 rounded-2xl hover:bg-gray-50/80 border border-transparent hover:border-gray-100 transition-all duration-200">
              <UserProfileCard />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative group/avatar h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-50 to-indigo-50 border border-gray-100 flex items-center justify-center overflow-hidden transition-all duration-200 hover:border-primary-300 hover:shadow-md hover:shadow-primary-100/20 cursor-pointer">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/avatar:scale-105"
                  />
                ) : (
                  <span className="text-primary-600 font-semibold text-base">
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
