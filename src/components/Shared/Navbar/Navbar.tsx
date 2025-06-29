'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';;
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import { FiHome, FiBook, FiUser, FiLogIn, FiLogOut, FiSettings, FiMenu, FiX, FiSearch,
} from 'react-icons/fi';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();


  const navLinks = [
    { label: 'Home', href: '/', icon: <FiHome /> },
    { label: 'Courses', href: '/courses', icon: <FiBook /> },
    { label: 'Dashboard', href: '/admin/dashboard', icon: <FiSettings />, adminOnly: true },
    { label: 'Profile', href: '/profile', icon: <FiUser />, authOnly: true },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      //TODO: Replace with your real auth logic
      setIsLoggedIn(true); 
      setIsAdmin(true);    
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
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
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary flex items-center justify-center">
        <Image
            height={30}
            width={30}
            src={"/logo/logo.png"} alt={'logo'}        />
        LearnHub</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(
            ({ label, href, icon, adminOnly, authOnly }) =>
              (!adminOnly || isAdmin) &&
              (!authOnly || isLoggedIn) && (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-1 text-sm font-medium ${
                    pathname === href ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              )
          )}

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/80 text-sm w-64"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary"
              >
                <FiLogIn />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-3 bg-white shadow">
          {navLinks.map(
            ({ label, href, icon, adminOnly, authOnly }) =>
              (!adminOnly || isAdmin) &&
              (!authOnly || isLoggedIn) && (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-2 py-2 px-3 rounded-md ${
                    pathname === href
                      ? 'bg-indigo-100 text-primary font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              )
          )}

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/80 text-sm w-full"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {/* Auth buttons */}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary w-full text-left"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary"
                >
                  <FiLogIn />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-700"
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
