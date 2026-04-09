'use client';

import { useCreateLectureMutation, useUpdateLectureMutation } from '@/redux/api/courseApi';
import { ILecture } from '@/type/module';
import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiX, FiPlus, FiTrash, FiLoader, FiUpload, FiFileText, FiCheckCircle, FiVideo } from 'react-icons/fi';

interface VideoModalProps {
  moduleId: string;
  toggleModalLecture: () => void;
  lecture?: ILecture | null;
}

export default function LectureModal({ moduleId, toggleModalLecture, lecture = null }: VideoModalProps) {
  const isEditMode = Boolean(lecture);
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [notes, setNotes] = useState<string[]>(['']);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createLecture] = useCreateLectureMutation();
  const [updateLecture] = useUpdateLectureMutation();

  useEffect(() => {
    setTitle(lecture?.title ?? '');
    setVideoFile(null);
    setVideoUrl(lecture?.videoUrl ?? '');
    setNotes(lecture?.notes?.length ? lecture.notes : ['']);
  }, [lecture]);

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

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith('video/')) {
        return toast.error('Please upload a valid video file!');
      }
      setVideoFile(file);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return toast.error('Please enter a lecture title!');
    }

    if (!videoFile && !videoUrl.trim()) {
      return toast.error('Please select a video file or provide a video URL!');
    }

    setIsLoading(true);

    const formData = new FormData();
    const data = {
      module: moduleId,
      title: title.trim(),
      notes: notes.filter(note => note.trim() !== ''),
      videoUrl: videoUrl.trim(),
    };

    formData.append('data', JSON.stringify(data));
    if (videoFile) {
      formData.append('file', videoFile);
    }

    try {
      const res = isEditMode && lecture
        ? await updateLecture({ id: lecture._id, data: formData }).unwrap()
        : await createLecture(formData).unwrap();
      if (res?.success) {
        toast.success(isEditMode ? 'Lecture updated successfully!' : 'Lecture created successfully!');
        toggleModalLecture();
      } else {
        toast.error(res?.message || (isEditMode ? 'Failed to update lecture' : 'Failed to create lecture'));
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-linear-to-r from-primary-600 to-primary-500 p-6 shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FiVideo className="text-white/80" />
              {isEditMode ? 'Update Lecture' : 'Create New Lecture'}
            </h2>
            <button
              onClick={toggleModalLecture}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all"
            >
              <FiX className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto custom-scrollbar flex-1">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* Lecture Title */}
            <div>
              <label className="block text-sm font-bold text-dark-800 mb-2 ml-1">Lecture Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g., Intro to React Hooks"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark-800 mb-2 ml-1">Video URL</label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste a video link or upload a new file"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
              />
              <p className="mt-2 text-xs text-gray-500 ml-1">
                {isEditMode
                  ? 'Keep the existing URL or replace it with a new upload.'
                  : 'Optional if you want to upload the file instead.'}
              </p>
            </div>

            {/* Video Upload Area */}
            <div>
              <label className="block text-sm font-bold text-dark-800 mb-2 ml-1">Video Content</label>
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => document.getElementById('video-upload-input')?.click()}
                className={`
                  relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer
                  flex flex-col items-center justify-center gap-3 group
                  ${isDragging ? 'border-primary-500 bg-primary-50 ring-4 ring-primary-500/10' : 'border-gray-200 bg-gray-50 hover:border-primary-400 hover:bg-white'}
                  ${videoFile ? 'border-green-400 bg-green-50/30' : ''}
                `}
              >
                <input
                  id="video-upload-input"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  className="hidden"
                />

                {videoFile ? (
                  <>
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <FiCheckCircle className="text-3xl text-green-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-green-800 font-bold">{videoFile.name}</p>
                      <p className="text-sm text-green-600 mt-1">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-16 w-16 rounded-full bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FiUpload className="text-3xl text-primary-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-dark-800 font-bold">Click or drag video to upload</p>
                      <p className="text-sm text-gray-500 mt-1">MP4, WebM, or Ogg (Max 50MB recommended)</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-bold text-dark-800 ml-1 flex items-center gap-2">
                  <FiFileText className="text-gray-400" />
                  Lecture Notes
                </label>
                <button
                  type="button"
                  onClick={addNoteField}
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <FiPlus /> Add Note
                </button>
              </div>

              <div className="space-y-3">
                {notes.map((note, index) => (
                  <div key={index} className="flex items-center gap-3 animate-in slide-in-from-left-2 duration-200">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => handleNoteChange(e.target.value, index)}
                      placeholder={`Key point ${index + 1}`}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                    />
                    {notes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNoteField(index)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-all"
                        title="Remove Note"
                      >
                        <FiTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 shrink-0 bg-gray-50/50">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={toggleModalLecture}
              className="flex-1 px-6 py-4 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-100 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !title.trim()}
              className="flex-[1.5] px-6 py-4 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin text-xl" />
                  {isEditMode ? 'Updating Lecture...' : 'Creating Lecture...'}
                </>
              ) : (
                <>
                  <FiPlus className="text-xl" />
                  {isEditMode ? 'Update Lecture' : 'Create Lecture'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

