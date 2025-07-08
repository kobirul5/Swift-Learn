'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiX, FiPlus, FiTrash, FiLoader } from 'react-icons/fi';
// import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useCreateLectureMutation } from '@/features/moduleAndLectureAPI';

interface VideoModalProps {
  moduleId: string;
  toggleModalLecture: () => void;
}

export default function LectureModal({ moduleId, toggleModalLecture }: VideoModalProps) {
  // const axiosPublic = useAxiosPublic();

  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [notes, setNotes] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [createLecture] = useCreateLectureMutation()

  const handleNoteChange = (value: string, index: number) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const addNoteField = () => setNotes([...notes, '']);

  const removeNoteField = (index: number) => {
    if (notes.length > 1) {
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      module: moduleId,
      title,
      videoUrl,
      notes: notes.filter(note => note.trim() !== ''),
    };

    try {
      const res = await createLecture(payload);
      if (res?.data?.success) {
        toast.success('Lecture created successfully!');
        toggleModalLecture();
      } else {
        toast.error('Failed to create lecture');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Create New Lecture</h2>
            <button
              onClick={toggleModalLecture}
              className="text-white hover:text-red-400 transition text-2xl"
            >
              <FiX />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Lecture Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Intro to React Hooks"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              placeholder="https://example.com/lecture-video.mp4"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
          </div>

          {/* Notes Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Lecture Notes</label>
              <button
                type="button"
                onClick={addNoteField}
                className="text-sm text-primary-600 hover:underline flex items-center gap-1"
              >
                <FiPlus className="text-base" /> Add Note
              </button>
            </div>

            <div className="space-y-3">
              {notes.map((note, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => handleNoteChange(e.target.value, index)}
                    placeholder={`Note ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
                  />
                  {notes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNoteField(index)}
                      className="text-red-500 hover:text-red-700 text-lg p-2"
                      title="Remove Note"
                    >
                      <FiTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={toggleModalLecture}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition disabled:opacity-70 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Lecture'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
