'use client';
import { useParams, useRouter } from 'next/navigation';
import { useUpdateCourseMutation } from '@/features/courseAPI';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { ICourse } from '@/type/course.interface';

export default function UpdateCoursePage() {
  const [crs, setCrs] = useState<ICourse>()
  const router = useRouter();
  const params = useParams();
  const axiosPublic = useAxiosPublic()
  const [updateCourse] = useUpdateCourseMutation();

  useEffect(() => {
    const srcFunc = async () => {
      const crs = await axiosPublic.get(`/api/courses/${params.id}`)
      setCrs(crs.data.data)

    }
    srcFunc()
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const price = parseFloat((form.elements.namedItem('price') as HTMLInputElement).value);
    const thumbnail = (form.elements.namedItem('thumbnail') as HTMLInputElement).value;

    const updatedData = {
      id: params.id,
      title,
      description,
      price,
      thumbnail,
    }
    try {
      const res = await updateCourse(updatedData);
      if (res?.data?.success) {
        toast.success("Course updated successfully!");
        router.push('/dashboard/courses');
      } else {
        toast.error("Update failed!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <div className="p-6 bg-white mx-auto rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-dark-800">Update Course </h1>
        <button onClick={() => router.back()} className="text-dark-600 hover:text-dark-800">← Back to Courses</button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark-700 mb-1">
              Course Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={crs?.title}
              className="w-full px-4 py-2 border border-dark-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-dark-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={crs?.description}
              rows={4}
              className="w-full px-4 py-2 border border-dark-300 rounded-md"
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
                defaultValue={crs?.price}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-dark-300 rounded-md"
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
                defaultValue={crs?.thumbnail}
                className="w-full px-4 py-2 border border-dark-300 rounded-md"
              />
            </div>
          </div>

          {crs?.thumbnail && (
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">Thumbnail Preview</label>
              <div className="w-full h-48 bg-dark-100 rounded-md overflow-hidden">
                <img
                  src={crs?.thumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" onClick={() => router.push("/dashboard/courses")} className="px-4 py-2 border border-dark-300 rounded-md text-dark-700 hover:bg-dark-50">Cancel</button>
          <button type="submit" disabled={isSubmitting} className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'}`}>
            {isSubmitting ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </form>
    </div>
  );
}
