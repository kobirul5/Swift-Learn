'use client';

import Image from "next/image";
import { FaTimes, FaStar } from "react-icons/fa";

interface TestimonialDetailsModalProps {
    testimonial: any;
    onClose: () => void;
}

const TestimonialDetailsModal = ({ testimonial, onClose }: TestimonialDetailsModalProps) => {
    if (!testimonial) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">Testimonial Details</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-16 h-16">
                            <Image
                                src={testimonial.image || "https://i.ibb.co/G4yDhqLg/man-7.jpg"}
                                alt={testimonial.name || ""}
                                fill
                                className="rounded-full object-cover border-2 border-primary-100"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-primary-600 font-medium uppercase tracking-wider">
                                {testimonial.designation}
                            </p>
                            <div className="flex items-center text-yellow-500 mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-sm ${i < testimonial.rating ? "text-yellow-400" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 italic text-gray-700 leading-relaxed mb-6">
                        "{testimonial.content}"
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className={`px-3 py-1 rounded-full font-semibold ${testimonial.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}>
                            {testimonial.isApproved ? "Approved" : "Pending Approval"}
                        </span>
                        <span className="text-gray-400">
                            Submitted on {new Date(testimonial.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialDetailsModal;
