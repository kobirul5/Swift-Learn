import VerifyOtpForm from "@/components/pages/auth/VerifyOtpForm";
import { Suspense } from "react";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm/>
    </Suspense>
  )
}
