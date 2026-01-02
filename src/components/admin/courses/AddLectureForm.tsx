
import { useCreateLectureMutation } from "@/redux/api/courseApi";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  moduleId: string;
}

export default function AddLectureForm({ moduleId }: Props) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [createLecture, { isLoading }] = useCreateLectureMutation();

  const handleSubmit = async () => {
    if (!title.trim() || !videoUrl.trim()) {
      toast.error("Both title and video URL are required");
      return;
    }

    try {
      await createLecture({
        module: moduleId,
        title: title.trim(),
        videoUrl: videoUrl.trim(),
        notes: [],
      }).unwrap();
      toast.success("Lecture added!");
      setTitle("");
      setVideoUrl("");
    } catch {
      toast.error("Failed to add lecture");
    }
  };

  return (
    <div className="bg-blue-50 rounded-xl p-6 mb-8">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Add New Lecture</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Lecture title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-70"
        >
          {isLoading ? "Adding..." : "Add Lecture"}
        </button>
      </div>
    </div>
  );
}