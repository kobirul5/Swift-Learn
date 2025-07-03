'use client';

import CourseBannerDetails from '@/components/CoursesComponents/CourseBannerDetails';
import {useParams } from 'next/navigation';

export default function Page() {
  const params = useParams()
  
  return <div>
    <CourseBannerDetails id={params.id as string}/>
  </div>
}
