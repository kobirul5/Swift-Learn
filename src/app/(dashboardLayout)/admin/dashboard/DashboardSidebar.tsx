import UserProfileCard from "@/components/UserProfileCard";
import Image from "next/image";
import Link from "next/link";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiSettings,
  FiStar,
  FiHelpCircle,
  FiMail,
  FiBriefcase,
  FiMessageSquare
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
  {
    name: "Testimonials",
    href: "/admin/dashboard/testimonials",
    icon: <FiStar />,
  },
  { name: "FAQs", href: "/admin/dashboard/faqs", icon: <FiHelpCircle /> },
  { name: "Messages", href: "/admin/dashboard/messages", icon: <FiMail /> },
  { name: "Support Chat", href: "/admin/dashboard/support-chat", icon: <FiMessageSquare /> },
  { name: "Settings", href: "/admin/dashboard/settings", icon: <FiSettings /> },
];

export default function DashboardSidebar() {
  return (
    <div className="hidden md:flex md:shrink-0">
      <div className="flex flex-col w-64 border-r border-dark-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center  shrink-0 px-4">
            <Link
              href="/"
              className="text-2xl font-bold text-primary flex items-center gap-2"
            >
              <Image src="/logo/logo.png" alt="logo" width={30} height={30} />
              SwiftLearn
            </Link>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-dark-600 hover:bg-dark-50 hover:text-dark-900"
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="shrink-0 flex border-t border-dark-200 p-4">
          <Link href="/profile">
            <UserProfileCard />
          </Link>
        </div>
      </div>
    </div>
  );
}
