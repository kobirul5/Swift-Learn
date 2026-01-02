// components/admin/courses/LectureItem.tsx

interface Props {
  title: string;
  videoUrl: string;
  isLocked: boolean;
  notesCount: number;
}

export default function LectureItem({ title, videoUrl, isLocked, notesCount }: Props) {
  return (
    <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
      <div className="flex items-center gap-5">
        <div className="text-3xl">{isLocked ? "🔒" : "▶️"}</div>
        <div>
          <p className="font-semibold text-gray-900 text-lg">{title}</p>
          <p className="text-sm text-gray-500 mt-1 truncate max-w-md">{videoUrl}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        {notesCount > 0 ? `${notesCount} note${notesCount > 1 ? "s" : ""}` : "No notes"}
      </p>
    </div>
  );
}