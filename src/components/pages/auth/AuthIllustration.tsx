'use client';

import Lottie from 'lottie-react';
import studentAnimation from '@/assets/auth/Student.json';
import { BookOpen, Users, Lightbulb } from 'lucide-react';

export default function AuthIllustration() {
    return (
        <div className="relative z-10 flex flex-col justify-center items-center text-white px-8 md:px-16 py-12 w-full">
            <div className="w-full max-w-md mb-8">
                <Lottie animationData={studentAnimation} loop={true} />
            </div>

            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Learn Without Limits
                </h2>
                <p className="text-lg md:text-xl mb-12 max-w-lg opacity-95 mx-auto">
                    Access premium courses, expert instructors, and a vibrant learning community — all in one place.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center w-full">
                <div>
                    <BookOpen className="w-10 h-10 mx-auto mb-3 text-primary-200" />
                    <p className="text-2xl md:text-3xl font-bold">500+</p>
                    <p className="text-sm md:text-lg opacity-80">Courses</p>
                </div>
                <div>
                    <Users className="w-10 h-10 mx-auto mb-3 text-primary-200" />
                    <p className="text-2xl md:text-3xl font-bold">50K+</p>
                    <p className="text-sm md:text-lg opacity-80">Students</p>
                </div>
                <div>
                    <Lightbulb className="w-10 h-10 mx-auto mb-3 text-primary-200" />
                    <p className="text-2xl md:text-3xl font-bold">98%</p>
                    <p className="text-sm md:text-lg opacity-80">Success</p>
                </div>
            </div>
        </div>
    );
}
