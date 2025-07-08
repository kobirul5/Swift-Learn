'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ILecture, IModule } from '@/type/module';
import { useGetModuleQuery } from '@/features/moduleAndLectureAPI';
import VideoForLecture from './VideoForLecture';

const LearningPlatform = () => {
    const params = useParams();
    const { data, isLoading } = useGetModuleQuery(params.id);

    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const [currentLectureId, setCurrentLectureId] = useState<string | null>(null);
    const [modules, setModules] = useState<IModule[]>()

    useEffect(() => {
        if (!data) return;
        if (data.data) {
            setModules(data.data)
        }
    }, [data]);


    const handleLectureClick = (lectureId: string) => {
        setCurrentLectureId(lectureId);
    };

    const toggleModule = (moduleId: string) => {
        setExpandedModule(prev => (prev === moduleId ? null : moduleId));
    };

    if (isLoading) {
        return <h1 className="py-40 text-center text-xl font-semibold">Loading...</h1>;
    }

    if (!modules) {
        return <h1>data not found</h1>
    }

    const currentModule = modules.find((m: IModule) => m._id === expandedModule);
    const currentLecture = currentModule?.lectures.find(l => l._id === currentLectureId);

    return (
        <div className="container px-4 mx-auto py-20">
            <div className="grid lg:grid-cols-12 gap-6">

                {/* Video Section */}
                <div className="lg:col-span-8 p-6 bg-primary-100 overflow-y-auto rounded-lg">
                    <h1 className="text-2xl font-bold text-white-800 mb-4 border-b pb-5">
                        {currentLecture?.title || "Select a Lecture"}
                    </h1>
                    {/* video or notes */}
                    {currentLecture &&
                        <VideoForLecture
                            currentLecture={currentLecture}
                        />
                    }

                    {currentModule && (
                        <div className="bg-primary-50 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold text-white-700 mb-2">{currentModule.title}</h2>
                            <p className="text-white-600">
                                Currently playing: {currentLecture?.title || "None"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
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
                        <div className="text-xs uppercase tracking-wider text-white-400 mb-2">Course Modules</div>

                        {modules.map((module: IModule, idx) => (
                            <div key={module._id} className="mb-2">
                                <div
                                    onClick={() => toggleModule(module._id)}
                                    className={`p-3 rounded cursor-pointer transition-colors flex justify-between items-center ${expandedModule === module._id
                                        ? 'bg-primary-500 hover:bg-primary-600'
                                        : 'bg-primary-700 hover:bg-primary-600'
                                        }`}
                                >
                                    <div>
                                        <div className="font-medium">Module:{idx + 1} {module.title}</div>
                                        <div className="text-xs text-white-300 mt-1">
                                            {module.lectures?.length || 0} Lectures
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${expandedModule === module._id ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {expandedModule === module._id && (
                                    <div className="mt-1 ml-4 pl-2 border-l-2 border-primary-600">
                                        {module.lectures.map((lecture: ILecture) => {
                                            const duration = (lecture).duration || '5:00';
                                            const completed = (lecture).isCompleted || false;

                                            return (
                                                <div
                                                    key={lecture._id}
                                                    onClick={() => handleLectureClick(lecture._id)}
                                                    className={`p-2 text-sm rounded cursor-pointer ${currentLectureId === lecture._id
                                                        ? 'bg-primary-600 text-white'
                                                        : completed
                                                            ? 'text-white-300 hover:bg-primary-600'
                                                            : 'text-white-400 hover:bg-primary-600'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span>{lecture.title}</span>
                                                        <span className="text-xs">{duration}</span>
                                                    </div>
                                                    {completed && (
                                                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mt-1"></span>
                                                    )}
                                                </div>
                                            );
                                        })}
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
