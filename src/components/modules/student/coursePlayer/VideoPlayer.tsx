"use client"

import { useState } from "react"
import { ILecture } from "@/type/module"
import NoContentAvilable from "@/components/NoContentAvailable"

interface VideoPlayerProps {
    currentLecture: ILecture | null;
    moduleIndex?: number;
    lectureIndex?: number;
}

export function VideoPlayer({ currentLecture, moduleIndex, lectureIndex }: VideoPlayerProps) {
    const [activeTab, setActiveTab] = useState<'video' | 'note'>('video');
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    const handleNoteClick = (note: string) => {
        setSelectedNote(note);
        setActiveTab('note');
    };

    if (!currentLecture) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center bg-primary-100 rounded-lg">
                <p className="text-white-800 text-xl font-semibold">Select a lecture to start learning</p>
            </div>
        )
    }

    const getEmbedUrl = (url: string) => {
        if (!url) return "";

        // YouTube
        const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) {
            return `https://www.youtube.com/embed/${ytMatch[1]}`;
        }

        // Vimeo
        const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }

        return url;
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white-800 border-b pb-5">
                {(moduleIndex !== undefined && lectureIndex !== undefined)
                    ? `Module ${moduleIndex + 1} | Lesson ${moduleIndex + 1}-${lectureIndex + 1}: ${currentLecture.title}`
                    : currentLecture.title}
            </h1>

            {/* Display Section */}
            <div className="w-full h-[450px] rounded-lg shadow-md overflow-hidden relative bg-black">
                {activeTab === 'video' && currentLecture.videoUrl ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={getEmbedUrl(currentLecture.videoUrl)}
                        title="Lecture Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                    ></iframe>
                ) : activeTab === 'note' && selectedNote ? (
                    <div className="bg-white text-gray-800 p-8 h-full overflow-y-auto">
                        <h3 className="text-2xl font-semibold mb-4 text-primary-700 border-b pb-2">{currentLecture.title} - Notes</h3>
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">{selectedNote}</p>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center bg-gray-900">
                        <NoContentAvilable />
                    </div>
                )}
            </div>

            {/* Tabs / Switch between Video and Notes if playing note */}
            {activeTab === 'note' && (
                <div className="flex justify-start">
                    <button
                        onClick={() => setActiveTab('video')}
                        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
                    >
                        Back to Video
                    </button>
                </div>
            )}

            {/* Notes List */}
            {currentLecture.notes && currentLecture.notes.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-6 bg-primary-500 rounded-full"></span>
                        Lecture Notes
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentLecture.notes.map((note, index) => (
                            <li
                                key={index}
                                onClick={() => handleNoteClick(note)}
                                className="p-3 rounded-lg border border-gray-50 hover:border-primary-200 hover:bg-primary-50 cursor-pointer transition-all flex items-start gap-2 group"
                            >
                                <span className="text-primary-500 mt-0.5">📌</span>
                                <span className="text-gray-700 text-sm font-medium group-hover:text-primary-700 line-clamp-2">{note}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
