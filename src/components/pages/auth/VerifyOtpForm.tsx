"use client";

import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Shared/Loader";

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState(0);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const pageName = searchParams.get("pageName");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await verifyOtp({ otp, email: email }).unwrap();

      if (res.success) {
        toast.success("OTP verified successfully!");
        if (pageName === "forgot-password") {
          router.push(`/reset-password?email=${encodeURIComponent(email || "")}`);
          return;
        }
        router.push("/");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to verify OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      const type = pageName === "forgot-password" ? "forgot-password" : "registration";
      await resendOtp({ email, type }).unwrap();
      toast.success("OTP resent successfully!");
      setTimer(60);
      setCanResend(false);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <Suspense fallback={<Loader message="Securing your access..." minHeight="min-h-screen" />}>
      <div className="min-h-screen flex mx-auto justify-center items-center">
        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
          <div className="max-w-md w-full">
            {/* Heading and description */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900">Verify OTP</h1>
              <p className="mt-3 text-lg text-gray-600">Enter the OTP sent to your email.</p>
            </div>

            {/* Form card */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    OTP
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                    <input
                      id="otp"
                      type="number"
                      required
                      value={otp || ""}
                      onChange={(e) => setOtp(Number(e.target.value))}
                      placeholder="Enter OTP"
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
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>

              {/* Resend OTP Section */}
              <div className="mt-8 text-center space-y-4">
                <div className="text-sm text-gray-600">
                  {canResend ? (
                    <button
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="font-medium text-primary-600 hover:text-primary-700 hover:underline transition-all"
                    >
                      {isResending ? "Resending..." : "Resend OTP"}
                    </button>
                  ) : (
                    <span>
                      Resend OTP in <span className="font-bold text-primary-600 font-mono">{timer}s</span>
                    </span>
                  )}
                </div>

                <div className="border-t pt-4">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    Back to login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
