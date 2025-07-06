'use client'
import React, { useState } from 'react';

interface Lecture {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
}

interface Module {
    id: number;
    title: string;
    duration: string;
    progress: string;
    lectures: Lecture[];
    active?: boolean;
}

const LearningPlatform = () => {
    const [expandedModule, setExpandedModule] = useState<number | null>(24);
    const [currentLecture, setCurrentLecture] = useState<number>(1);

    const modules: Module[] = [
        {
            id: 24,
            title: 'Assignment 4',
            duration: '0h 21m',
            progress: '3/5',
            active: true,
            lectures: [
                { id: 1, title: 'Introduction to Vercel', duration: '5:30', completed: true },
                { id: 2, title: 'Frontend Deployment', duration: '8:15', completed: true },
                { id: 3, title: 'Backend Configuration', duration: '10:45', completed: true },
                { id: 4, title: 'Environment Variables', duration: '7:20', completed: false },
                { id: 5, title: 'Final Deployment', duration: '9:10', completed: false },
            ]
        },
        {
            id: 22,
            title: 'Bootstrapping Redux Basic Project',
            duration: '2h 21m',
            progress: '0/13',
            lectures: [
                { id: 1, title: 'Redux Fundamentals', duration: '15:30', completed: false },
                { id: 2, title: 'Setting Up Store', duration: '12:45', completed: false },
            ]
        },
        {
            id: 23,
            title: 'Local State Management and RTK Query',
            duration: '2h 28m',
            progress: '0/14',
            lectures: [
                { id: 1, title: 'RTK Query Basics', duration: '18:20', completed: false },
                { id: 2, title: 'Advanced Queries', duration: '22:10', completed: false },
            ]
        }
    ];

    const toggleModule = (moduleId: number) => {
        setExpandedModule(expandedModule === moduleId ? null : moduleId);
    };

    const handleLectureClick = (lectureId: number) => {
        setCurrentLecture(lectureId);
    };

    return (
        <div className="container px-4 mx-auto py-20">
            <div className="grid lg:grid-cols-12 gap-6">

                {/* Video Section - 8/12 */}
                <div className="lg:col-span-8 p-6 bg-primary-100 overflow-y-auto rounded-lg">
                    <h1 className="text-2xl font-bold text-white-800 mb-4 border-b pb-5">
                        Vercel Deployment Guide (Frontend + Backend)
                    </h1>

                    <div className="w-full rounded-lg shadow-md overflow-hidden mb-6">
                        <video
                            controls
                            autoPlay
                            className="w-full"
                            poster="/video-poster.jpg"
                        >
                            <source src="/videos/hero-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className="bg-primary-50 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-white-700 mb-2">
                            {modules.find((m) => m.active)?.title}
                        </h2>
                        <p className="text-white-600">
                            Currently playing:{" "}
                            {
                                modules
                                    .find((m) => m.active)
                                    ?.lectures.find((l) => l.id === currentLecture)?.title
                            }
                        </p>
                    </div>
                </div>

                {/* Sidebar - 4/12 */}
                <div className="lg:col-span-4 bg-primary-800 h-[700px] rounded-xl text-white overflow-y-auto">
                    <div className="p-4 mx-4 border-b border-primary-400">
                        <div className="text-sm text-white-300">Search Lecture</div>
                        <input
                            type="text"
                            placeholder="Search Lesson..."
                            className="mt-2 w-full px-3 py-2 bg-primary-600 rounded text-sm text-white placeholder-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                    </div>

                    <div className="p-4">
                        <div className="text-xs uppercase tracking-wider text-white-400 mb-2">
                            Course Modules
                        </div>

                        {modules.map((module) => (
                            <div key={module.id} className="mb-2">
                                <div
                                    onClick={() => toggleModule(module.id)}
                                    className={`p-3 rounded cursor-pointer transition-colors flex justify-between items-center ${
                                        module.active
                                            ? "bg-primary-500 hover:bg-primary-600"
                                            : "bg-primary-700 hover:bg-primary-600"
                                    }`}
                                >
                                    <div>
                                        <div className="font-medium">{module.title}</div>
                                        <div className="text-xs text-white-300 mt-1">
                                            {module.duration} • {module.progress}
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${
                                            expandedModule === module.id ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>

                                {expandedModule === module.id && (
                                    <div className="mt-1 ml-4 pl-2 border-l-2 border-primary-600">
                                        {module.lectures.map((lecture) => (
                                            <div
                                                key={lecture.id}
                                                onClick={() => handleLectureClick(lecture.id)}
                                                className={`p-2 text-sm rounded cursor-pointer ${
                                                    currentLecture === lecture.id && module.active
                                                        ? "bg-primary-600 text-white"
                                                        : lecture.completed
                                                        ? "text-white-300 hover:bg-primary-600"
                                                        : "text-white-400 hover:bg-primary-600"
                                                }`}
                                            >
                                                <div className="flex justify-between">
                                                    <span>{lecture.title}</span>
                                                    <span className="text-xs">{lecture.duration}</span>
                                                </div>
                                                {lecture.completed && (
                                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full ml-1"></span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPlatform;
