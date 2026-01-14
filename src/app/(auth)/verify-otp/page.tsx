import VerifyOtpForm from "@/components/pages/auth/VerifyOtpForm";
import { Suspense } from "react";
import Loader from "@/components/Shared/Loader";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<Loader message="Verifying your credentials..." minHeight="min-h-screen" />}>
      <VerifyOtpForm />
    </Suspense>
  )
}
