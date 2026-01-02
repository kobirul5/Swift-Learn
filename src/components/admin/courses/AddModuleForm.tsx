
import { useCreateModuleMutation } from "@/redux/api/courseApi";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  courseId: string;
  onSuccess?: () => void;
}

export default function AddModuleForm({ courseId, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [createModule, { isLoading }] = useCreateModuleMutation();

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Module title is required");
      return;
    }

    try {
      await createModule({ course: courseId, title: title.trim(), description: "" }).unwrap();
      toast.success("Module added!");
      setTitle("");
      onSuccess?.();
    } catch {
      toast.error("Failed to add module");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Module</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., React Fundamentals"
          className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 text-lg"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-8 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 disabled:opacity-70"
        >
          {isLoading ? "Adding..." : "Add Module"}
        </button>
      </div>
    </div>
  );
}