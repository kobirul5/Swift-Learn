import React from 'react';

interface LoaderProps {
    message?: string;
    className?: string;
    minHeight?: string;
}

const Loader: React.FC<LoaderProps> = ({
    message = 'Loading...',
    className = '',
    minHeight = 'min-h-[400px]'
}) => {
    return (
        <div className={`flex flex-col justify-center items-center w-full ${minHeight} ${className}`}>
            <div className="relative flex justify-center items-center">
                {/* Outer Glowing Ring */}
                <div className="absolute w-16 h-16 rounded-full border-4 border-primary-500/20 animate-pulse"></div>

                {/* Main Spinning Border */}
                <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-primary-600 border-r-primary-600 animate-spin"></div>

                {/* Inner Pulsing Dot */}
                <div className="absolute w-4 h-4 bg-primary-600 rounded-full animate-ping opacity-75"></div>
            </div>

            {message && (
                <div className="mt-8 text-center">
                    <p className="text-lg font-semibold text-dark-800 tracking-tight">
                        {message}
                    </p>
                    <div className="flex justify-center gap-1 mt-2">
                        <span className="w-1 h-1 bg-primary-600 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                        <span className="w-1 h-1 bg-primary-600 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                        <span className="w-1 h-1 bg-primary-600 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loader;
