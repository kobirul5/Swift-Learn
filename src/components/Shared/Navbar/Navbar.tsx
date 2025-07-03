'use client';

import { useGetUserQuery, useLogoutUserMutation, userAPI } from '@/features/userAPI';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const {data,} = useGetUserQuery(undefined)
  const [logoutUser]  = useLogoutUserMutation()
  const dispatch = useDispatch()


  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/', icon: <FiHome /> },
    { label: 'Courses', href: '/courses', icon: <FiBook /> },
    { label: 'Dashboard', href: '/dashboard', icon: <FiSettings />, adminOnly: true },
    { label: 'Profile', href: '/student-profile', icon: <FiUser />, authOnly: true },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
  if (!data) return;

  if (data?.data?.role === 'admin') {
    setIsAdmin(true);
    setIsLoggedIn(true);
  } else if (data?.data.role == 'student') {
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async() => {
    await logoutUser(undefined)
    dispatch(userAPI.util.resetApiState());
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push('/');
  };

  
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <Image src="/logo/logo.png" alt="logo" width={30} height={30} />
          SwiftLearn
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {mounted &&
            navLinks.map(
              ({ label, href, icon, adminOnly, authOnly }) =>
                (!adminOnly || isAdmin) &&
                (!authOnly || isLoggedIn) && (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center space-x-1 text-sm font-medium ${
                      pathname === href ? 'text-primary font-semibold' : 'text-dark-700 hover:text-primary'
                    }`}
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
              className="pl-10 pr-4 py-2 rounded-full border border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary/80 text-sm w-64"
            />
            <FiSearch className="absolute left-3 top-2.5 text-dark-400" />
          </div>

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
                href="/auth/login"
                className="flex items-center space-x-1 text-dark-700 hover:text-primary"
              >
                <FiLogIn />
                <span>Login</span>
              </Link>
              <Link
                href="/auth/register"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-3 bg-white shadow">
          {mounted &&
            navLinks.map(
              ({ label, href, icon, adminOnly, authOnly }) =>
                (!adminOnly || isAdmin) &&
                (!authOnly || isLoggedIn) && (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center space-x-2 py-2 px-3 rounded-md ${
                      pathname === href
                        ? 'bg-primary-100 text-primary font-semibold'
                        : 'text-dark-700 hover:bg-dark-100'
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
              className="pl-10 pr-4 py-2 rounded-full border border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary/80 text-sm w-full"
            />
            <FiSearch className="absolute left-3 top-2.5 text-dark-400" />
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
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 text-dark-700 hover:text-primary"
                >
                  <FiLogIn />
                  <span>Login</span>
                </Link>
                <Link
                  href="/auth/register"
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
