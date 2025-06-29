'use client';

import Link from 'next/link';
import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
} from 'react-icons/fi';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-dark-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo/logo.png" alt="logo" width={30} height={30} />
              <span className="text-2xl font-bold text-white">SwiftLearn</span>
            </div>
            <p className="text-dark-400">
              Empowering learners worldwide with high-quality education and skill development.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-dark-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-dark-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-dark-400 hover:text-white transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-dark-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-dark-400 hover:text-white transition-colors">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-dark-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/courses" className="text-dark-400 hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/instructors" className="text-dark-400 hover:text-white transition-colors">Instructors</Link></li>
              <li><Link href="/about" className="text-dark-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-dark-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/categories/web-development" className="text-dark-400 hover:text-white transition-colors">Web Development</Link></li>
              <li><Link href="/categories/data-science" className="text-dark-400 hover:text-white transition-colors">Data Science</Link></li>
              <li><Link href="/categories/mobile-apps" className="text-dark-400 hover:text-white transition-colors">Mobile Apps</Link></li>
              <li><Link href="/categories/programming" className="text-dark-400 hover:text-white transition-colors">Programming</Link></li>
              <li><Link href="/categories/business" className="text-dark-400 hover:text-white transition-colors">Business</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-dark-400 mb-4">
              Subscribe to get updates on new courses and special offers.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg  focus:outline-none focus:ring-2 focus:ring-primary-500 w-full text-dark-200 bg-dark-700"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-400 text-sm mb-4 md:mb-0">
            © {currentYear} LearnHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-dark-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-dark-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-dark-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
