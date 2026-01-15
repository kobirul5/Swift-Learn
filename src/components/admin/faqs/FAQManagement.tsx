'use client';

import { useCreateFaqMutation, useDeleteFaqMutation, useGetFaqsQuery, useUpdateFaqMutation } from '@/redux/api/faqApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

export default function FAQManagement() {
    const { data: faqs, isLoading } = useGetFaqsQuery({});
    const [createFaq] = useCreateFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const [deleteFaq] = useDeleteFaqMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<any>(null);
    const [formData, setFormData] = useState({ question: '', answer: '' });

    const handleOpenModal = (faq?: any) => {
        if (faq) {
            setEditingFaq(faq);
            setFormData({ question: faq.question, answer: faq.answer });
        } else {
            setEditingFaq(null);
            setFormData({ question: '', answer: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingFaq) {
                await updateFaq({ id: editingFaq._id, ...formData }).unwrap();
                toast.success('FAQ updated successfully');
            } else {
                await createFaq(formData).unwrap();
                toast.success('FAQ created successfully');
            }
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await deleteFaq(id).unwrap();
                toast.success('FAQ deleted successfully');
            } catch (error: any) {
                toast.error(error?.data?.message || 'Failed to delete FAQ');
            }
        }
    };

    if (isLoading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-dark-900">FAQ Management</h1>
                    <p className="text-dark-500 text-sm">Create and manage frequently asked questions</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                    <FiPlus /> Add New FAQ
                </button>
            </div>

            <div className="bg-white rounded-xl border border-dark-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-dark-50 border-b border-dark-200">
                            <th className="px-6 py-4 text-sm font-semibold text-dark-700">Question</th>
                            <th className="px-6 py-4 text-sm font-semibold text-dark-700">Answer</th>
                            <th className="px-6 py-4 text-sm font-semibold text-dark-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-200">
                        {faqs?.data?.map((faq: any) => (
                            <tr key={faq._id} className="hover:bg-dark-50/50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-dark-900">{faq.question}</td>
                                <td className="px-6 py-4 text-sm text-dark-600 max-w-xs truncate">{faq.answer}</td>
                                <td className="px-6 py-4 text-sm text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleOpenModal(faq)}
                                            className="p-2 text-dark-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(faq._id)}
                                            className="p-2 text-dark-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {faqs?.data?.length === 0 && (
                    <div className="p-12 text-center text-dark-500">No FAQs found. Click "Add New FAQ" to create one.</div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-primary-600 p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition">
                                <FiX className="text-2xl" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-1">Question</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
                                    placeholder="e.g. How do I enroll?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-1">Answer</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition resize-none"
                                    placeholder="Provide a clear answer..."
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-dark-200 rounded-lg text-dark-700 hover:bg-dark-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2"
                                >
                                    <FiCheck /> {editingFaq ? 'Update FAQ' : 'Create FAQ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
