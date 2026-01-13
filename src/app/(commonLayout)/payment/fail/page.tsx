'use client';

import Link from 'next/link';
import { FiXCircle } from 'react-icons/fi';

const PaymentFailPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-50 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <FiXCircle className="w-20 h-20 text-red-500 animate-pulse" />
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                    Payment Failed
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Something went wrong with your transaction. Please verify your payment details and try again.
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        href="/courses"
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Try Again
                    </Link>

                    <Link
                        href="/"
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailPage;
