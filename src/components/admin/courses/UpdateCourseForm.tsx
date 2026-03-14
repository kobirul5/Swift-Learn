/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaFile } from "react-icons/fa";
import Image from "next/image";
import { useUpdateCourseMutation } from "@/redux/api/courseApi";
import { ICourse } from "@/type/course.interface";

interface UpdateCourseFormProps {
  courseData: ICourse;
  id: string;
}

export default function UpdateCourseForm({ courseData, id }: UpdateCourseFormProps) {
  const router = useRouter();

  // Form fields state
  const [course, setCourse] = useState({
    title: courseData.title || "",
    description: courseData.description || "",
    price: courseData.price || 0,
    isFeatured: courseData.isFeatured ?? false,
    category: courseData.category || "Web Development",
    avgRating: courseData.avgRating || 0,
  });

  // Thumbnail states
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(courseData.thumbnail || "");
  const [isDragOver, setIsDragOver] = useState(false);

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [updateCourse] = useUpdateCourseMutation();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setCourse((prev) => ({ ...prev, [name]: checked }));
    } else {
      setCourse((prev) => ({
        ...prev,
        [name]: (name === "price" || name === "avgRating") ? Number(value) || 0 : value,
      }));
    }
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    if (thumbnailPreview && thumbnailFile) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailFile(null);
    setThumbnailPreview("");
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course.title.trim()) {
      toast.error("Course title is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();

      // Stringify non-file data
      formData.append(
        "data",
        JSON.stringify({
          title: course.title,
          description: course.description,
          price: course.price,
          isFeatured: course.isFeatured,
          category: course.category,
          avgRating: course.avgRating,
          // If user didn't upload new thumbnail → keep old one (optional)
          ...(thumbnailPreview && !thumbnailFile && { thumbnail: courseData?.thumbnail }),
        })
      );

      // Append file if selected
      if (thumbnailFile) {
        formData.append("file", thumbnailFile);
      }

      const res = await updateCourse({
        id,
        data: formData
      }).unwrap();

      if (res?.success) {
        toast.success("Course updated successfully!");
        router.push("/admin/dashboard/courses");
      }
    } catch (err: any) {
      console.error(err);
      const message = err?.data?.message || err?.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 lg:p-8">
      {/* Server error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={course.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
              placeholder="Enter course title"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={course.category}
              onChange={(e) => setCourse((prev) => ({ ...prev, category: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white"
            >
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="Programming">Programming</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
              placeholder="Write a brief description about the course..."
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={course.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
              placeholder="0.00"
            />
          </div>

          {/* Average Rating */}
          <div>
            <label htmlFor="avgRating" className="block text-sm font-medium text-gray-700 mb-1">
              Average Rating (0-5)
            </label>
            <input
              type="number"
              id="avgRating"
              name="avgRating"
              value={course.avgRating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
              placeholder="0.0"
            />
          </div>

          {/* Is Featured */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={course.isFeatured}
              onChange={handleChange}
              className="h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer">
              Mark as Featured Course
            </label>
          </div>
          <p className="text-xs text-gray-500 ml-8 -mt-2">
            Featured courses will be highlighted on the homepage and listings.
          </p>
        </div>


        {/* Right: Thumbnail Upload & Preview */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Course Thumbnail
            </label>

            {/* Drag & Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-all ${
                isDragOver
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-300 hover:border-gray-400 bg-gray-50"
              } h-64 flex items-center justify-center`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (e.dataTransfer.files?.[0]) {
                  handleFileSelect(e.dataTransfer.files[0]);
                }
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              {thumbnailPreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-medium">Click or drag to change image</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeThumbnail();
                    }}
                    className="absolute top-2 right-2 z-20 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="text-center p-8">
                  <FaFile className="mx-auto h-16 w-12 text-primary-600/65 mb-4" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-primary-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP (up to 5MB)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="mt-10 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard/courses")}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg text-white font-medium transition ${
            isSubmitting
              ? "bg-primary-400 cursor-not-allowed"
              : "bg-primary-600 hover:bg-primary-700"
          }`}
        >
          {isSubmitting ? "Saving..." : "Update Course"}
        </button>
      </div>
    </form>
  );
}
