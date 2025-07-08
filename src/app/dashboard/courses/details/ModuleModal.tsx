import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiX, FiCheck, FiBookOpen, FiLoader } from "react-icons/fi";

interface ModuleModalProps {
    setShow: (value: boolean) => void;
    courseId: string;
}

export default function ModuleModal({ setShow, courseId }: ModuleModalProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const newModule = {
            course: courseId,
            title,
            description,
            isActive,
        };

        try {
            const res = await axiosPublic.post("/api/modules/create", newModule);
            if (res.data?.success) {
                toast.success("Module created successfully!");
                setShow(false);
                window.location.reload()
            } else {
                toast.error("Module creation failed!");
            }
        } catch (error: unknown) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background Overlay */}
            <div 
                className="absolute inset-0 bg-black/40 bg-opacity-10"
                onClick={() => setShow(false)}
            ></div>
            
            {/* Modal Container */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden z-10">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-5 text-white">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <FiBookOpen className="text-2xl" />
                            <h2 className="text-xl font-bold">Create New Module</h2>
                        </div>
                        <button 
                            onClick={() => setShow(false)}
                            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                        >
                            <FiX className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-dark-700">Module Title *</label>
                        <input
                            type="text"
                            placeholder="Introduction to Course"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-dark-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-dark-700">Description</label>
                        <textarea
                            placeholder="Brief description about this module..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full border border-dark-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-dark-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-dark-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            <span className="ml-3 text-sm font-medium text-dark-700">
                                Active Module
                            </span>
                        </label>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShow(false)}
                            className="px-5 py-2.5 rounded-lg border border-dark-300 text-dark-700 hover:bg-dark-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all font-medium flex items-center space-x-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex justify-center items-center"> 
                                    <FiLoader className="animate-spin" />
                                    Creating...
                                </span>
                                
                            ) : (
                                <>
                                    <FiCheck />
                                    <span>Create Module</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}