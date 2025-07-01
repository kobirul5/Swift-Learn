import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center  px-4 sm:px-0">
        <div className="text-6xl mb-4">
          😕
        </div>

        <h1 className="text-7xl font-bold text-red-600 mb-4">
          404
        </h1>

        <h2 className="text-3xl font-semibold text-dark-800 mb-6">
          Page Not Found
        </h2>

        <p className="text-lg text-dark-600 max-w-md text-center mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
