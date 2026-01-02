import ResetPasswordForm from '@/components/pages/auth/ResetPasswordForm'
import React, { Suspense } from 'react'

export default function page() {
  return (
    
  <Suspense fallback={<div>Loading...</div>}>
     <ResetPasswordForm/>
    </Suspense>
  )
}
