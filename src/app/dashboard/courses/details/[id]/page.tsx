'use client';

import {useParams } from 'next/navigation';
import CourseBannerDetails from './CourseBannerDetails';

export default function Page() {
  const params = useParams()
  
  return <div>
    <CourseBannerDetails id={params.id as string}/>
  </div>
}
