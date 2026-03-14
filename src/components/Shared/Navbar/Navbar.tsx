"use client";

import { useGetUserQuery } from "@/redux/api/userApi";
import { useResendOtpMutation } from "@/redux/api/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CourseSearchBar from "./CourseSearchBar";
import LogoutButton from "../Logout/LogoutButton";
import {
  FiHome,
  FiBook,
  FiUser,
  FiLogIn,
  FiSettings,
  FiMenu,
  FiX,
  FiMessageSquare,
  FiChevronDown,
  FiLogOut,
  FiLayout,
} from "react-icons/fi";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true, // Ensures fresh auth state on session changes
  });
  const [resendOtp] = useResendOtpMutation();
  const pathname = usePathname();

  const user = data?.data;
  const isLoggedIn = !!user;
  const role = user?.role;
  const isAdmin = role === "admin";
  const isStudent = role === "student";

  useEffect(() => {
    const handleUnverifiedUser = async () => {
      if (error && (error as any)?.data?.message === "Please verify your email!") {
        const email = (error as any)?.data?.data?.email;
        if (email) {
          try {
            await resendOtp({ email, type: "registration" });
            router.push(`/verify-otp?email=${email}`);
          } catch (err) {
            console.error("Failed to resend OTP from Navbar", err);
          }
        }
      }
    };

    handleUnverifiedUser();
  }, [error, resendOtp, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", icon: <FiHome /> },
    { label: "Courses", href: "/courses", icon: <FiBook /> },
    { label: "About", href: "/about", icon: <FiUser /> },
  ];

  const authLinks = [
    ...(isAdmin ? [{ label: "Admin Dashboard", href: "/admin/dashboard", icon: <FiLayout /> }] : []),
{ label: "My Learning", href: "/student", icon: <FiBook /> },
    { label: "Profile Settings", href: "/profile", icon: <FiSettings /> },
    { label: "Support", href: "/profile/support", icon: <FiMessageSquare /> },
  ];

  if (!mounted) return null;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? " bg-transparent  backdrop-blur-md  py-3"
        : " py-5"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center bg-white/40 backdrop-blur-sm rounded-2xl px-6 py-2 border border-white/20 shadow-sm">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent flex items-center gap-2 group transition-all duration-300"
          >
            <div className="relative w-10 h-10 transform group-hover:rotate-12 transition-transform duration-300">
              <Image src="/logo/logo.png" alt="logo" fill className="object-contain" />
            </div>
            <span className="hidden sm:block">SwiftLearn</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="w-64">
              <CourseSearchBar />
            </div>

            <div className="flex items-center space-x-6">
              {navLinks.map(({ label, href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center space-x-2 text-sm font-semibold transition-all duration-300 py-2 px-1
                    ${pathname === href
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                      : "text-gray-600 hover:text-primary hover:translate-y-[-1px]"
                    }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Auth Actions */}
            <div className="flex items-center border-l border-gray-200 pl-8 ml-2">
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-100 transition-all duration-300"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary ring-2 ring-primary/10">
                      <Image
                        src={user?.image || "/logo/logo.png"}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <FiChevronDown className={`text-gray-500 transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                      <div className="px-5 py-4 bg-primary/5 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                          {role}
                        </span>
                      </div>
                      <div className="p-2">
                        {authLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setShowProfileDropdown(false)}
                            className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200"
                          >
                            <span className="text-lg opacity-70">{link.icon}</span>
                            <span>{link.label}</span>
                          </Link>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <LogoutButton
                            className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                            onLogoutSuccess={() => setShowProfileDropdown(false)}
                            showIcon={true}
                            text="Sign Out"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-sm font-bold text-gray-700 hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary hover:bg-primary-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 active:scale-95"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 pb-8 pt-4 px-6 animate-in slide-in-from-top-5 duration-300">
          <div className="space-y-4">
            <CourseSearchBar isMobile={true} />
            
            <div className="grid grid-cols-1 gap-2">
              {[...navLinks, ...(isLoggedIn ? authLinks : [])].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200
                    ${pathname === link.href ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-bold">{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              {isLoggedIn ? (
                <LogoutButton
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-red-50 text-red-600 font-bold rounded-2xl transition-all"
                  onLogoutSuccess={() => setIsOpen(false)}
                  showIcon={true}
                  text="Sign Out"
                />
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center p-4 text-gray-700 font-bold border border-gray-200 rounded-2xl"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center p-4 bg-primary text-white font-bold rounded-2xl"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
