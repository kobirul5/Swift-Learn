"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateCourseMutation } from "@/redux/features/courseAPI";
import toast from "react-hot-toast";

export default function AddCoursePage() {
  const router = useRouter();

  // Form fields state (title, description, price, isFeatured)
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: 0,
    isFeatured: false, // New field for featured course
  });

  // Thumbnail file and preview states
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [createCourse] = useCreateCourseMutation();

  // Handle text/number input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Special handling for checkbox
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setCourse((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setCourse((prev) => ({
        ...prev,
        [name]: name === "price" ? Number(value) || 0 : value,
      }));
    }
  };

  // Handle file selection (from click or drag & drop)
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

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course.title) {
      toast.error("Course title is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          title: course.title,
          description: course.description,
          price: course.price,
          isFeatured: course.isFeatured,
        })
      );


      if (thumbnailFile) {
        formData.append("file", thumbnailFile); 
      }

      // console.log(
      //   "Submitting form data:",
      //   formData.getAll("title"),
      //   formData.getAll("description"),
      //   formData.getAll("price"),
      //   formData.getAll("isFeatured"),
      //   formData.getAll("file"),
      //   "from course----------------------------"
      // );

      const res = await createCourse(formData).unwrap();
      console.log("Course created:", res);

      if (res?.success) {
        toast.success("Course created successfully!");
        router.push("/admin/dashboard/courses");
      }
    } catch (err: any) {
      console.error(err);
      const message =
        err?.data?.message || err?.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove selected thumbnail
  const removeThumbnail = () => {
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailFile(null);
    setThumbnailPreview("");
  };

  return (
    <div className="p-6 bg-white mx-auto rounded-2xl max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-dark-800">Add New Course</h1>
        <button
          onClick={() => router.back()}
          className="text-dark-600 hover:text-dark-800"
        >
          ← Back to Courses
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Main layout: Left = Form fields, Right = Thumbnail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: Form inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-dark-700 mb-1"
              >
                Course Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-dark-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-dark-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-dark-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-dark-700 mb-1"
              >
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
                className="w-full px-4 py-2 border border-dark-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Is Featured Checkbox */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={course.isFeatured}
                onChange={handleChange}
                className="h-5 w-5 text-primary-600 border-dark-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="isFeatured"
                className="text-sm font-medium text-dark-700 cursor-pointer"
              >
                Mark as Featured Course
              </label>
            </div>
            <p className="text-xs text-dark-500 -mt-4 ml-8">
              Featured courses will be highlighted on the homepage and listings.
            </p>
          </div>

          {/* Right side: Thumbnail upload and preview */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-3">
                Course Thumbnail
              </label>

              {/* Drag & Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  isDragOver
                    ? "border-primary-500 bg-primary-50"
                    : "border-dark-300 hover:border-dark-400 bg-dark-50"
                }`}
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
                  onChange={(e) =>
                    e.target.files?.[0] && handleFileSelect(e.target.files[0])
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <svg
                  className="mx-auto h-16 w-16 text-dark-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-sm text-dark-600">
                  <span className="font-semibold text-primary-600">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-dark-500 mt-1">
                  PNG, JPG, WebP (up to 5MB)
                </p>
              </div>
            </div>

            {/* Thumbnail Preview */}
            {thumbnailPreview && (
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-3">
                  Preview
                </label>
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-dark-200">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-80 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2.5 hover:bg-red-700 transition shadow-md"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-10 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard/courses")}
            className="px-6 py-3 border border-dark-300 rounded-lg text-dark-700 hover:bg-dark-50 transition"
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
            {isSubmitting ? "Saving..." : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
