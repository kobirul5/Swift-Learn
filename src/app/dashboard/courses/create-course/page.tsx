'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateCourseMutation } from '@/features/courseAPI';
import toast from 'react-hot-toast';


export default function AddCoursePage() {
  const router = useRouter();
  const [course, setCourse] = useState({ 
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createCourse, {data}] = useCreateCourseMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res =await createCourse(course)
      console.log(data,"-------------course")
      if(res.data?.success){
        toast.success("successfull")
      } 
      router.push('/dashboard/courses');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  return (
    <div className="p-6 bg-white  mx-auto rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-dark-800">Add New Course</h1>
        <button 
          onClick={() => router.back()}
          className="text-dark-600 hover:text-dark-800"
        >
          ← Back to Courses
        </button>
      </div>

      <form onSubmit={handleSubmit} className=" p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark-700 mb-1">
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

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-dark-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-dark-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-dark-700 mb-1">
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

            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-dark-700 mb-1">
                Thumbnail URL
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={course.thumbnail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-dark-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Image preview */}
          {course.thumbnail && (
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Thumbnail Preview
              </label>
              <div className="w-full h-48 bg-dark-100 rounded-md overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt="Course thumbnail preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/courses")}
            className="px-4 py-2 border border-dark-300 rounded-md text-dark-700 hover:bg-dark-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'}`}
          >
            {isSubmitting ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </form>
    </div>
  );
}