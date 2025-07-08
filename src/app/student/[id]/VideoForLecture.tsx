'use client';

import { ILecture } from '@/type/module';
import { useState } from 'react';

interface Props {
  currentLecture: ILecture;
}

const VideoForLecture = ({ currentLecture }: Props) => {
  const [activeTab, setActiveTab] = useState<'video' | 'note'>('video');
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const handleNoteClick = (note: string) => {
    setSelectedNote(note);
    setActiveTab('note');
  };

  return (
    <>
      {/* Video or Note Display */}
      <div className="w-full h-[400px] rounded-lg shadow-md overflow-hidden mb-6">
        {activeTab === 'video' && currentLecture.videoUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={currentLecture.videoUrl}
            title="Lecture Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : activeTab === 'note' && selectedNote ? (
          <div className="bg-white text-gray-800 p-4 h-full overflow-y-auto">
            <h3 className="text-xl font-semibold mb-2">{selectedNote}</h3>
          </div>
        ) : (
          <div className="text-center py-20 text-white-600">No content available</div>
        )}
      </div>

      {/* Notes List */}
      {currentLecture.notes && currentLecture.notes.length > 0 && (
        <div className="bg-white mt-4 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Lecture Notes</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {currentLecture.notes.map((note, index) => (
              <li
                key={index}
                onClick={() => handleNoteClick(note)}
                className="cursor-pointer hover:text-primary-500 hover:underline"
              >
                📌 {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default VideoForLecture;
