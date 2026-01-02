// components/admin/courses/ModuleCard.tsx

import AddLectureForm from "./AddLectureForm";
import LectureItem from "./LectureItem";

interface Module {
  _id: string;
  moduleNumber: number;
  title: string;
  description?: string;
  isActive: boolean;
  lectures: Array<{
    _id: string;
    title: string;
    videoUrl: string;
    isLocked: boolean;
    notes?: string[];
  }>;
}

interface Props {
  module: Module;
}

export default function ModuleCard({ module }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 px-8 py-6 border-b-2 border-primary-100">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Module {module.moduleNumber}: {module.title}
            </h3>
            {module.description && <p className="text-gray-600 mt-2">{module.description}</p>}
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              module.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
            }`}
          >
            {module.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="p-8">
        <AddLectureForm moduleId={module._id} />

        {module.lectures.length > 0 ? (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">
              Lectures ({module.lectures.length})
            </h4>
            {module.lectures.map((lecture) => (
              <LectureItem
                key={lecture._id}
                title={lecture.title}
                videoUrl={lecture.videoUrl}
                isLocked={lecture.isLocked}
                notesCount={lecture.notes?.length || 0}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8 italic">No lectures yet.</p>
        )}
      </div>
    </div>
  );
}