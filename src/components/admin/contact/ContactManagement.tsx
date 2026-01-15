'use client';

import { useDeleteContactMutation, useGetContactsQuery } from '@/redux/api/contactApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2, FiEye, FiX, FiMail, FiCalendar, FiUser, FiInfo } from 'react-icons/fi';
import Pagination from '@/components/Shared/Pagination';

export default function ContactManagement() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const limit = 10;
    const { data: contacts, isLoading } = useGetContactsQuery({ page, limit, searchTerm });
    const [deleteContact] = useDeleteContactMutation();

    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteContact(id).unwrap();
                toast.success('Message deleted successfully');
                if (selectedMessage?._id === id) setSelectedMessage(null);
            } catch (error: any) {
                toast.error(error?.data?.message || 'Failed to delete message');
            }
        }
    };

    if (isLoading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-6">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-dark-900">Message Management</h1>
                    <p className="text-dark-500 text-sm">View and manage messages from the Get In Touch form</p>
                </div>
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
                    />
                    <div className="absolute left-3 top-2.5 text-dark-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-dark-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-dark-50 border-b border-dark-200">
                            <th className="px-6 py-4 text-sm font-semibold text-dark-700">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-dark-700">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-dark-700">Subject</th>
                            <th className="px-6 py-4 text-sm font-semibold text-dark-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-200">
                        {contacts?.data?.map((contact: any) => (
                            <tr key={contact._id} className="hover:bg-dark-50/50 transition">
                                <td className="px-6 py-4 text-sm text-dark-600">
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="font-medium text-dark-900">{contact.name}</div>
                                    <div className="text-dark-500 text-xs">{contact.email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-dark-600 max-w-xs truncate">
                                    {contact.subject}
                                </td>
                                <td className="px-6 py-4 text-sm text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedMessage(contact)}
                                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
                                            title="View Message"
                                        >
                                            <FiEye />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {contacts?.meta && contacts.meta.totalPages > 0 && (
                    <Pagination
                        currentPage={page}
                        totalPages={contacts.meta.totalPages}
                        onPageChange={(p) => setPage(p)}
                        variant="admin"
                    />
                )}

                {contacts?.data?.length === 0 && (
                    <div className="p-12 text-center text-dark-500">No messages found.</div>
                )}
            </div>

            {/* Message View Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-primary-600 p-6 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <FiMail className="text-2xl" />
                                <h2 className="text-xl font-bold">Message Details</h2>
                            </div>
                            <button onClick={() => setSelectedMessage(null)} className="hover:bg-white/20 p-2 rounded-full transition">
                                <FiX className="text-2xl" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-dark-100">
                                <div className="space-y-1">
                                    <div className="text-xs font-semibold text-dark-400 uppercase flex items-center gap-2">
                                        <FiUser /> From
                                    </div>
                                    <div className="text-dark-900 font-medium">{selectedMessage.name}</div>
                                    <div className="text-primary-600 text-sm">{selectedMessage.email}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-semibold text-dark-400 uppercase flex items-center gap-2">
                                        <FiCalendar /> Received On
                                    </div>
                                    <div className="text-dark-900 font-medium">
                                        {new Date(selectedMessage.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-dark-400 uppercase flex items-center gap-2">
                                    <FiInfo /> Subject
                                </div>
                                <div className="text-lg font-bold text-dark-900">{selectedMessage.subject}</div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-dark-400 uppercase">Message Content</div>
                                <div className="bg-dark-50 p-5 rounded-xl text-dark-700 leading-relaxed whitespace-pre-wrap border border-dark-100 italic">
                                    "{selectedMessage.message}"
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="px-6 py-2 border border-dark-200 rounded-lg text-dark-700 hover:bg-dark-50 transition font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
