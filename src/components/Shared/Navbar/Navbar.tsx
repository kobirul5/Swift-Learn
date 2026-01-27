"use client";

import { useLogoutUserMutation } from "@/redux/api/auth";
import { useGetUserQuery } from "@/redux/api/userApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiBook,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiMenu,
  FiX,
  FiSearch,
} from "react-icons/fi";
// import { useDispatch } from "react-redux";

import { useGetCourseQuery } from "@/redux/api/courseApi";
import { ICourse } from "@/type/course.interface";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: searchData, isFetching } = useGetCourseQuery({ searchTerm: debouncedTerm, limit: 5 }, { skip: !debouncedTerm });

  const { data } = useGetUserQuery(undefined);
  const [logoutUser] = useLogoutUserMutation();
  // const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const query = searchParams.get("searchTerm");
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const handleSearch = (term?: string) => {
    const query = term || searchTerm;
    if (query.trim()) {
      router.push(`/courses?searchTerm=${query}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (courseId: string) => {
    router.push(`/courses/details/${courseId}`);
    setShowSuggestions(false);
    setSearchTerm("");
  }

  const navLinks = [
    { label: "Home", href: "/", icon: <FiHome /> },
    { label: "Courses", href: "/courses", icon: <FiBook /> },
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <FiSettings />,
      adminOnly: true,
    },
    {
      label: "Profile",
      href: "/student-profile",
      icon: <FiUser />,
      authOnly: true,
    },
    { label: "My Classes", href: "/student", icon: <FiUser />, authOnly: true },
    { label: "About", href: "/about", icon: <FiUser />, authOnly: true },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!data) return;

    if (data?.data?.role === "admin") {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else if (data?.data?.role === "student") {
      setIsLoggedIn(true);
    } else {
      setIsAdmin(false);
      setIsLoggedIn(false);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUser(undefined);
    localStorage.removeItem("accessToken");
    // dispatch(userAPI.util.resetApiState());
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/");
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

          <div className="relative group">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
              className="pl-10 pr-4 py-2 rounded-full border border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary/80 text-sm w-64 transition-all duration-300"
            />
            <FiSearch
              className="absolute left-3 top-2.5 text-dark-400 cursor-pointer"
              onClick={() => handleSearch()}
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && debouncedTerm && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-dark-100 overflow-hidden z-50">
                {isFetching ? (
                  <div className="p-3 text-center text-sm text-dark-500">Loading...</div>
                ) : searchData?.data?.length > 0 ? (
                  <ul>
                    {searchData.data.map((course: ICourse) => (
                      <li
                        key={course._id}
                        onClick={() => handleSuggestionClick(course._id)}
                        className="px-4 py-2 hover:bg-dark-50 cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <FiSearch className="text-dark-400 shrink-0" size={14} />
                        <span className="text-dark-700 text-sm truncate">{course.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3 text-center text-sm text-dark-500">No courses found</div>
                )}
              </div>
            )}
          </div>
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
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-dark-700 hover:text-primary"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-1 text-dark-700 hover:text-primary"
              >
                <FiLogIn />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Sign Up
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

          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-4 py-2 rounded-full border border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary/80 text-sm w-full"
            />
            <FiSearch
              className="absolute left-3 top-2.5 text-dark-400 cursor-pointer"
              onClick={() => handleSearch()}
            />
          </div>

          <div className="pt-4 border-t border-dark-200 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 text-dark-700 hover:text-primary w-full text-left"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
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
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Sign Up
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
