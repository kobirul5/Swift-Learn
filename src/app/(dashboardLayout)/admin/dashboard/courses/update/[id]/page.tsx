'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaFile } from 'react-icons/fa';
import Image from 'next/image';

import { useUpdateCourseMutation, useGetCourseByIdQuery } from '@/redux/api/courseApi';
import Loader from '@/components/Shared/Loader';

export default function UpdateCoursePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [updateCourse] = useUpdateCourseMutation();
  const { data, isLoading, error: queryError } = useGetCourseByIdQuery(params.id);

  const courseData = data?.data;

  // Form states
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: 0,
    isFeatured: false,
    category: 'Web Development',
  });

  // Thumbnail states
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Populate form with existing course data
  useEffect(() => {
    if (courseData) {
      setCourse({
        title: courseData.title || '',
        description: courseData.description || '',
        price: courseData.price || 0,
        isFeatured: courseData.isFeatured ?? false,
        category: courseData.category || 'Web Development',
      });

      if (courseData.thumbnail) {
        setThumbnailPreview(courseData.thumbnail);
      }
    }
  }, [courseData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCourse((prev) => ({ ...prev, [name]: checked }));
    } else {
      setCourse((prev) => ({
        ...prev,
        [name]: name === 'price' ? Number(value) || 0 : value,
      }));
    }
  };

  const handleFileSelect = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPG, PNG, WebP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    if (thumbnailPreview && thumbnailFile) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!course.title.trim()) {
      toast.error('Course title is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();

      formData.append(
        'data',
        JSON.stringify({
          title: course.title,
          description: course.description,
          price: course.price,
          isFeatured: course.isFeatured,
          category: course.category,
          // If user didn't upload new thumbnail → keep old one (optional)
          ...(thumbnailPreview && !thumbnailFile && { thumbnail: courseData?.thumbnail }),
        })
      );

      if (thumbnailFile) {
        formData.append('file', thumbnailFile);
      }

      // Most RTK Query update mutations accept { id, body }
      const res = await updateCourse({
        id: params.id,
        data: formData,
      }).unwrap();


      if (res?.success) {
        toast.success('Course updated successfully!');
        router.push('/admin/dashboard/courses');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      const message = err?.data?.message || err?.message || 'Failed to update course';
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader message="Loading course data..." />;
  }

  if (queryError || !courseData) {
    return (
      <div className="p-8 bg-white rounded-2xl text-center">
        <p className="text-red-600 mb-4">Error loading course data</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 lg:p-8 bg-white rounded-2xl">
      {/* Server error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Update Course</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          ← Back to Courses
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
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
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
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
                    alt="Course thumbnail preview"
                    fill
                    className="object-cover"
                    onError={() => setThumbnailPreview('')}
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

      <div className="mt-10 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard/courses')}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg text-white font-medium transition ${
            isSubmitting ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Update Course'}
        </button>
      </div>
    </form>
  );
}