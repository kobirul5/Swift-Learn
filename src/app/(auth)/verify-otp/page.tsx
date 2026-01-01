"use client";

import { useVerifyOtpMutation } from "@/redux/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(0);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  console.log(email, "email---");

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res: any = await verifyOtp({ otp, email: email}).unwrap();
      console.log(res, "res---");
      if (res.success) {
        toast.success("OTP verified successfully!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex mx-auto justify-center items-center">
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="max-w-md w-full">
          {/* Heading and description */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Verify OTP</h1>
            <p className="mt-3 text-lg text-gray-600">
              Enter the OTP sent to your email.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    id="otp"
                    type="number"
                    required
                    value={otp}
                    onChange={(e) => setOtp(Number(e.target.value))}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-semibold bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition shadow-lg disabled:opacity-70"
              >
                {isLoading ? "Sending..." : "Send  OTP"}
              </button>
            </form>

            {/* Back to login link */}
            <div className="mt-8 text-center">
              <Link
                href="/login"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
              >
                Resend OTP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
