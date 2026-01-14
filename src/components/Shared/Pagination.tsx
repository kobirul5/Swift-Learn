import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: 'admin' | 'public';
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    variant = 'admin'
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Style variants
    const styles = {
        admin: {
            container: "p-6 border-t border-gray-200",
            button: "px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium transition",
            text: "text-gray-700 font-medium"
        },
        public: {
            container: "mt-12",
            button: "px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition",
            text: "text-dark-700 font-medium text-lg"
        }
    };

    const currentStyles = styles[variant];

    return (
        <div className={currentStyles.container}>
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={currentStyles.button}
                >
                    Previous
                </button>
                <span className={currentStyles.text}>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={currentStyles.button}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
