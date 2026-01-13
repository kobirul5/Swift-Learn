'use client';

import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

const PaymentSuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <FiCheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                    Payment Successful!
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Thank you for your enrollment. Your transaction has been completed successfully, and you can now access your course.
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        href="/student"
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Go to Dashboard
                    </Link>

                    <Link
                        href="/courses"
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                    >
                        Browse More Courses
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
