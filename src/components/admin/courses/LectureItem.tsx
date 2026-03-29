import { Play, FileText, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cd";
import { useState } from "react";
import { getEmbedUrl } from "@/utils/video";

interface Props {
  title: string;
  notesCount: number;
  videoUrl: string;
}

export default function LectureItem({
  title,
  notesCount,
  videoUrl,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-2 mb-2 rounded-lg border border-primary-100 bg-white overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-start gap-3 text-left transition-all hover:bg-primary-50"
      >
        {/* Icon */}
        <div className="shrink-0 mt-0.5">
          <Play className="w-5 h-5 text-primary-500" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium mb-1 leading-snug text-dark-900">
            {title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-primary-400">
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>{notesCount} notes</span>
            </div>
          </div>
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-primary-400 mt-1 transition-transform",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {/* Details Panel */}
      {isOpen && (
        <div className="px-4 py-3 bg-primary-50 border-t border-primary-100 text-xs">
          <div className="space-y-4">
            {videoUrl && (
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow-inner">
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(videoUrl)}
                  title="Lecture Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-primary-700">Video URL:</span>
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {videoUrl}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
