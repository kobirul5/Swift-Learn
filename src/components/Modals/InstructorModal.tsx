/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { FaTimes, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { 
    useCreateInstructorMutation, 
    useUpdateInstructorMutation 
} from "@/redux/api/instructorApi";
import toast from "react-hot-toast";
import Image from "next/image";

interface InstructorModalProps {
    isOpen: boolean;
    onClose: () => void;
    instructor?: any;
    isEditMode: boolean;
}

const InstructorModal = ({ isOpen, onClose, instructor, isEditMode }: InstructorModalProps) => {
    const [createInstructor, { isLoading: isCreating }] = useCreateInstructorMutation();
    const [updateInstructor, { isLoading: isUpdating }] = useUpdateInstructorMutation();
    
    // Form States
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [bio, setBio] = useState("");
    const [yearsExperience, setYearsExperience] = useState(0);
    const [studentsTaught, setStudentsTaught] = useState(0);
    const [averageRating, setAverageRating] = useState(5.0);
    const [coursesCreated, setCoursesCreated] = useState(0);
    const [teachingPhilosophy, setTeachingPhilosophy] = useState("");
    
    // Expertise (comma separated for simplicity in UI, converted to array)
    const [expertiseInput, setExpertiseInput] = useState("");
    
    // Certifications
    const [certifications, setCertifications] = useState<{title: string, period: string}[]>([
        { title: "", period: "" }
    ]);

    // Social Links
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");

    // Image
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode && instructor) {
            setName(instructor.name || "");
            setDesignation(instructor.designation || "");
            setBio(instructor.bio || "");
            setYearsExperience(instructor.yearsExperience || 0);
            setStudentsTaught(instructor.studentsTaught || 0);
            setAverageRating(instructor.averageRating || 5.0);
            setCoursesCreated(instructor.coursesCreated || 0);
            setTeachingPhilosophy(instructor.teachingPhilosophy || "");
            
            setExpertiseInput(instructor.expertise?.join(", ") || "");
            
            if (instructor.certifications && instructor.certifications.length > 0) {
                setCertifications([...instructor.certifications]);
            } else {
                setCertifications([{ title: "", period: "" }]);
            }
            
            setTwitter(instructor.socialLinks?.twitter || "");
            setLinkedin(instructor.socialLinks?.linkedin || "");
            setGithub(instructor.socialLinks?.github || "");
            
            setImagePreview(instructor.image || null);
        } else {
            // Reset form
            setName("");
            setDesignation("");
            setBio("");
            setYearsExperience(0);
            setStudentsTaught(0);
            setAverageRating(5.0);
            setCoursesCreated(0);
            setTeachingPhilosophy("");
            setExpertiseInput("");
            setCertifications([{ title: "", period: "" }]);
            setTwitter("");
            setLinkedin("");
            setGithub("");
            setImageFile(null);
            setImagePreview(null);
        }
    }, [isEditMode, instructor, isOpen]);

    const handleCertificationChange = (index: number, field: 'title' | 'period', value: string) => {
        const newCerts = [...certifications];
        newCerts[index][field] = value;
        setCertifications(newCerts);
    };

    const addCertification = () => {
        setCertifications([...certifications, { title: "", period: "" }]);
    };

    const removeCertification = (index: number) => {
        if (certifications.length > 1) {
            const newCerts = certifications.filter((_, i) => i !== index);
            setCertifications(newCerts);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            
            const data = {
                name,
                designation,
                bio,
                yearsExperience: Number(yearsExperience),
                studentsTaught: Number(studentsTaught),
                averageRating: Number(averageRating),
                coursesCreated: Number(coursesCreated),
                teachingPhilosophy,
                expertise: expertiseInput.split(",").map(s => s.trim()).filter(Boolean),
                certifications: certifications.filter(c => c.title && c.period),
                socialLinks: {
                    twitter,
                    linkedin,
                    github
                }
            };

            formData.append("data", JSON.stringify(data));
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (isEditMode) {
                await updateInstructor({ id: instructor._id, data: formData }).unwrap();
                toast.success("Instructor updated successfully");
            } else {
                if (!imageFile) {
                    toast.error("Image is required");
                    return;
                }
                await createInstructor(formData).unwrap();
                toast.success("Instructor created successfully");
            }
            onClose();
        } catch (error: any) {
            console.error("Failed to save instructor:", error);
            toast.error(error?.data?.message || "Failed to save instructor");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-20">
            <div className="bg-white rounded-lg shadow-xl w-full p-10 max-w-5xl m-4 max-h-[90vh] overflow-y-auto ">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {isEditMode ? "Edit Instructor" : "Add New Instructor"}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <FaTimes size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                            <input
                                type="text"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    {/* Bio & Philosophy */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Philosophy</label>
                            <textarea
                                value={teachingPhilosophy}
                                onChange={(e) => setTeachingPhilosophy(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Years Exp.</label>
                            <input
                                type="number"
                                value={yearsExperience}
                                onChange={(e) => setYearsExperience(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                min="0" required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                            <input
                                type="number"
                                value={studentsTaught}
                                onChange={(e) => setStudentsTaught(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                min="0" required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                            <input
                                type="number"
                                value={averageRating}
                                onChange={(e) => setAverageRating(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                step="0.1" min="0" max="5" required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Courses</label>
                            <input
                                type="number"
                                value={coursesCreated}
                                onChange={(e) => setCoursesCreated(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                min="0" required
                            />
                        </div>
                    </div>

                    {/* Expertise */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expertise (Comma separated)</label>
                        <input
                            type="text"
                            value={expertiseInput}
                            onChange={(e) => setExpertiseInput(e.target.value)}
                            placeholder="e.g. React, Node.js, Python"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>

                    {/* Certifications */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <label className="block text-sm font-medium text-gray-700">Certifications</label>
                             <button type="button" onClick={addCertification} className="text-primary text-sm hover:underline flex items-center gap-1">
                                <FaPlus size={12} /> Add
                             </button>
                        </div>
                        <div className="space-y-3">
                            {certifications.map((cert, index) => (
                                <div key={index} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={cert.title}
                                        onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
                                        placeholder="Title (e.g. AWS Certified)"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                    <input
                                        type="text"
                                        value={cert.period}
                                        onChange={(e) => handleCertificationChange(index, 'period', e.target.value)}
                                        placeholder="Period (e.g. 2022-Present)"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                    {certifications.length > 1 && (
                                        <button type="button" onClick={() => removeCertification(index)} className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                            <input
                                type="url"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                            <input
                                type="url"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Github URL</label>
                            <input
                                type="url"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                        <div className="flex items-center gap-4">
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition"
                            >
                                {imagePreview ? (
                                    <Image 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        width={96} 
                                        height={96} 
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center">
                                        <FaUpload size={20} />
                                        <span className="text-xs mt-1">Upload</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <div className="text-sm text-gray-500">
                                <p>Click to upload or drag and drop</p>
                                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreating || isUpdating ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin h-4 w-4 border-2 border-white border-b-transparent rounded-full"></span>
                                    Processing...
                                </span>
                            ) : (
                                isEditMode ? "Update Instructor" : "Create Instructor"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstructorModal;
