// components/admin/courses/ModuleCard.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cd";
import { Plus } from "lucide-react";
import LectureModal from "@/components/Modals/LectureModal";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);

  return (
    <div className="border-b border-primary-200 bg-primary-50">
      {/* Module Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 flex items-start gap-3 hover:bg-primary-100 transition-colors"
      >
        <ChevronDown
          className={cn(
            "w-5 h-5 text-primary-400 mt-1 transition-transform shrink-0",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
        />
        <div className="flex-1 text-left">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-sm font-semibold text-dark-900 leading-tight mb-1">
                Module {module.moduleNumber}: {module.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-primary-400">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    module.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {module.isActive ? "Active" : "Inactive"}
                </span>
                <span>•</span>
                <span>{module.lectures.length} Lectures</span>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Module Content */}
      {isOpen && (
        <div className="pb-4 bg-white/50">
          <div className="px-4 pt-4 flex justify-end">
            <button
              onClick={() => setIsLectureModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-xs font-bold rounded-lg hover:bg-primary-700 transition-all active:scale-95 shadow-md shadow-primary-200"
            >
              <Plus className="w-4 h-4" />
              Add Lecture
            </button>
          </div>

          <div className="mt-4 px-4 space-y-2">
            {module.description && (
              <p className="text-xs text-primary-400 px-4 mb-4 italic">
                {module.description}
              </p>
            )}

            {module.lectures.length > 0 ? (
              <div className="space-y-2">
                {module.lectures.map((lecture) => (
                  <LectureItem
                    key={lecture._id}
                    title={lecture.title}
                    videoUrl={lecture.videoUrl}
                    notesCount={lecture.notes?.length || 0}
                  />
                ))}
              </div>
            ) : (
              <div className="mx-4 py-6 text-center border border-dashed border-primary-200 rounded-lg">
                <p className="text-xs text-primary-400 italic">No lectures yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isLectureModalOpen && (
        <LectureModal
          moduleId={module._id}
          toggleModalLecture={() => setIsLectureModalOpen(false)}
        />
      )}
    </div>
  );
}
