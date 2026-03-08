"use client";

import { useGetUserQuery } from "@/redux/api/userApi";
import { useResendOtpMutation } from "@/redux/api/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseSearchBar from "./CourseSearchBar";
import {
  FiHome,
  FiBook,
  FiUser,
  FiLogIn,
  FiSettings,
  FiMenu,
  FiX,
  FiSearch,
  FiMessageSquare,
} from "react-icons/fi";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data, isLoading, error } = useGetUserQuery(undefined);
  const [resendOtp] = useResendOtpMutation();
  const pathname = usePathname();

  let user = data?.data;
  let isLoggedIn = !!user;
  let isAdmin = user?.role === "admin";
console.log(data)
  useEffect(() => {
    // user = data?.data;
    // isLoggedIn = !!user;
    // isAdmin = user?.role === "admin";
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
  }, [error, resendOtp, router, data]);

  const navLinks = [
    { label: "Home", href: "/", icon: <FiHome /> },
    { label: "Courses", href: "/courses", icon: <FiBook /> },
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <FiSettings />,
      adminOnly: true,
    },
    { label: "My Classes", href: "/student", icon: <FiUser />, authOnly: true },
    { label: "Support", href: "/profile/support", icon: <FiMessageSquare />, authOnly: true },
    { label: "About", href: "/about", icon: <FiUser /> },
  ];

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

  const onLogoutSuccess = () => {
  };



  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white shadow-md py-2"
        : "bg-white/90 backdrop-blur-sm py-4"
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-primary flex items-center gap-2"
        >
          <Image src="/logo/logo.png" alt="logo" width={30} height={30} />
          SwiftLearn
        </Link>
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">

          <CourseSearchBar />
          {mounted &&
            navLinks.map(
              ({ label, href, icon, adminOnly, authOnly }) =>
                (!adminOnly || isAdmin) &&
                (!authOnly || isLoggedIn) && (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center space-x-1 text-sm font-medium ${pathname === href
                      ? "text-primary font-semibold"
                      : "text-dark-700 hover:text-primary"
                      }`}
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                )
            )}



          {isLoggedIn ? (
            <Link
              href="/profile"
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-100 hover:border-primary-500 transition-all duration-300 active:scale-90"
            >
              <Image
                src={data?.data?.image || "/logo/logo.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-1 text-dark-700 hover:text-primary"
              >
                <FiLogIn />
                <span>Login</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden px-4 pt-4 pb-6 space-y-3 bg-white shadow">
          {mounted &&
            navLinks.map(
              ({ label, href, icon, adminOnly, authOnly }) =>
                (!adminOnly || isAdmin) &&
                (!authOnly || isLoggedIn) && (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center space-x-2 py-2 px-3 rounded-md ${pathname === href
                      ? "bg-primary-100 text-primary font-semibold"
                      : "text-dark-700 hover:bg-dark-100"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                )
            )}

          <CourseSearchBar isMobile={true} />

          <div className="pt-4 border-t border-dark-200 space-y-2">
            {isLoggedIn ? (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 py-2 px-3 rounded-md text-dark-700 hover:bg-dark-100 transition-all"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-dark-200">
                  <Image
                    src={data?.data?.image || "/logo/logo.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold">My Profile</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 text-dark-700 hover:text-primary"
                >
                  <FiLogIn />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
