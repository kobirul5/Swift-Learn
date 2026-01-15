'use client';

import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useCreateContactMutation } from '@/redux/api/contactApi';
import toast from 'react-hot-toast';

const ContactForm = () => {
    const [createContact, { isLoading }] = useCreateContactMutation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createContact(formData).unwrap();
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to send message');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-dark-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
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
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
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
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
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
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
                        placeholder="Your message here..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <FiSend className={`mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isLoading ? 'animate-pulse' : ''}`} />
                    {isLoading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
