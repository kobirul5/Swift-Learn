import Heading from '@/components/Heading'
import Image from 'next/image'
import React from 'react'

export default function OurStory() {
    return (
        <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <Heading
                        title='Our'
                        title2='Story'
                        subtitle=''
                    />
                    <p className="text-dark-600 mb-4">
                        Founded in 2020, our platform began as a small project to help local students access better learning resources.
                        Today, we serve thousands of learners worldwide with our comprehensive course offerings.
                    </p>
                    <p className="text-dark-600">
                        We believe that education should be engaging, accessible, and tailored to individual learning styles.
                        Our team works tirelessly to create learning experiences that inspire and empower.
                    </p>
                </div>
                <div className="bg-dark-100 rounded-xl h-80 overflow-hidden">
                    {/* Replace with your actual office image */}
                    <div className="w-full relative h-full flex items-center justify-center text-dark-400">
                        <Image
                            fill
                            src='/assets/team.jpg'
                            alt='team image'
                            className='absolute object-cover'
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}
