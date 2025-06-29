'use client';

import Link from 'next/link';
import { JSX } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

interface ISocialIcon {
    name: string,
    icon: JSX.Element
}

const ContactUs = () => {

    const socialIcon: ISocialIcon[] = [
        {
            name: "facebook",
            icon: <FiFacebook />,
        },
        {
            name: "twitter",
            icon: <FiTwitter />,
        },
        {
            name: "linkedin",
            icon: <FiLinkedin />,
        },
        {
            name: "instagram",
            icon: <FiInstagram />,
        },
    ];

    return (
        <section className="pb-12 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-dark-900 mb-4">
                        Get in <span className="text-primary-600">Touch</span>
                    </h2>
                    <p className="text-xl text-dark-600 max-w-2xl mx-auto">
                        We&apos;d love to hear from you! Reach out for any questions or feedback.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
                        <h3 className="text-2xl font-bold text-dark-900 mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start">
                                <div className="bg-primary-100 p-3 rounded-full mr-4">
                                    <FiMail className="text-primary-600 text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-dark-900">Email Us</h4>
                                    <p className="text-dark-600">support@swiftlearn.com</p>
                                    <p className="text-dark-600">inquiries@swiftlearn.com</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start">
                                <div className="bg-primary-100 p-3 rounded-full mr-4">
                                    <FiPhone className="text-primary-600 text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-dark-900">Call Us</h4>
                                    <p className="text-dark-600">+1 (555) 123-4567</p>
                                    <p className="text-dark-600">Mon-Fri: 9am-5pm EST</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start">
                                <div className="bg-primary-100 p-3 rounded-full mr-4">
                                    <FiMapPin className="text-primary-600 text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-dark-900">Visit Us</h4>
                                    <p className="text-dark-600">123 Learning Street</p>
                                    <p className="text-dark-600">Boston, MA 02108, USA</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-10">
                            <h4 className="text-lg font-medium text-dark-900 mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                {socialIcon.map((platform, idx) => (
                                    <Link
                                        key={idx}
                                        href="#"
                                        className="bg-dark-100 hover:bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                        aria-label={platform.name}
                                    >
                                        <span className="sr-only">{platform.name}</span>
                                        {/* Optional: Add actual icons here if available */}
                                        <span className="text-sm text-primary-600 font-semibold">
                                            {platform.icon}
                                            </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
                        <h3 className="text-2xl font-bold text-dark-900 mb-6">Send Us a Message</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-dark-700 mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-dark-700 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                            >
                                <FiSend className="mr-2" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
