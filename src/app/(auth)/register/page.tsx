
import Link from 'next/link';
import { GraduationCap, BookOpen, Users, Lightbulb } from 'lucide-react';
import SignupForm from '@/components/pages/auth/SinginForm';
import AuthIllustration from '@/components/pages/auth/AuthIllustration';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Education Theme Illustration */}
       <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-600 to-primary-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
      
              <AuthIllustration />
      
              {/* Wave decoration */}
              <div className="absolute bottom-0 left-0 w-full opacity-30">
                <svg viewBox="0 0 1440 320" className="w-full">
                  <path
                    fill="#ffffff"
                    d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,186.7C672,171,768,149,864,154.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"
                  />
                </svg>
              </div>
            </div>
      
      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              Create Your Account
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Join now and start learning today
            </p>
          </div>

          <SignupForm />

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
