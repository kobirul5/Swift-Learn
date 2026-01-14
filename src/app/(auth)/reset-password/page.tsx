import ResetPasswordForm from '@/components/pages/auth/ResetPasswordForm'
import React, { Suspense } from 'react'
import Loader from '@/components/Shared/Loader'

export default function page() {
  return (

    <Suspense fallback={<Loader message="Preparing password reset..." minHeight="min-h-screen" />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
