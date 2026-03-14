"use client"
import { useCreateTestimonialMutation } from "@/redux/api/testimonialApi";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import Heading from "@/components/Heading";

const SubmitTestimonial = () => {
    const [createTestimonial, { isLoading }] = useCreateTestimonialMutation();
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name") as string,
            designation: formData.get("designation") as string,
            content: formData.get("content") as string,
            rating: rating,
            accentColor: "bg-primary-500", // Default accent
        };

        if (!data.name || !data.designation || !data.content) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const res = await createTestimonial(data).unwrap();
            if (res.success) {
                toast.success("Testimonial submitted successfully! It will be visible once approved.");
                form.reset();
                setRating(5);
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to submit testimonial.");
        }
    };

    return (
        <section className="py-20 bg-gray-50 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <Heading 
                        title="Share Your Success" 
                        title2="Story" 
                        subtitle="Your feedback helps us grow and inspires other learners to start their journey. Submit your testimonial below!" 
                    />

                    <div className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                                        Your Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="e.g. Abdullah Al Mamun"
                                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm text-gray-900"
                                        required
                                    />
                                </div>
                                {/* Designation */}
                                <div>
                                    <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                                        Who are you? (Role)
                                    </label>
                                    <input
                                        type="text"
                                        id="designation"
                                        name="designation"
                                        placeholder="e.g. Frontend Developer / Student"
                                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm text-gray-900"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex flex-col items-center justify-center p-6 bg-primary-50/50 rounded-2xl border border-primary-100 italic transition-all duration-300 hover:bg-primary-50">
                                <p className="text-sm font-semibold text-primary-800 mb-3">Overall Rating</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="focus:outline-none transform transition-transform duration-200 hover:scale-125"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                        >
                                            <FaStar
                                                className={`text-3xl ${
                                                    (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                                                } transition-colors duration-200`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-2 text-xs text-primary-600 font-medium tracking-wide uppercase">
                                    {rating === 5 ? "Loved it!" : rating === 4 ? "Great Experience" : rating === 3 ? "It's Okay" : rating === 2 ? "Could be better" : "Poor"}
                                </p>
                            </div>

                            {/* Content */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                                    Your Mesage
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={4}
                                    placeholder="Tell us about your learning journey and how SwiftLearn helped you achieve your goals..."
                                    className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm text-gray-900 min-h-[150px] resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                    className="w-full bg-linear-to-r from-primary-700 to-primary-600 hover:from-primary-600 hover:to-primary-500 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center text-lg">
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Testimonial"
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubmitTestimonial;
