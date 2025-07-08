'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ILecture, IModule } from '@/type/module';
import { useGetModuleQuery } from '@/features/moduleAndLectureAPI';
import VideoForLecture from './VideoForLecture';
import { FiCheckCircle, FiChevronDown, FiSearch } from 'react-icons/fi';

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

                <div className="lg:col-span-4 bg-primary-100 h-[700px] rounded-xl text-white overflow-y-auto shadow-xl ">
                    {/* Search Section */}
                    <div className="sticky top-0 z-10 bg-primary-100 p-5 border-b border-dark-800 backdrop-blur-sm bg-opacity-90">
                        <div className="text-sm font-medium text-dark-900 mb-2">Search Lectures</div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Type to search lessons..."
                                className="w-full px-4 py-2.5 bg-primary-800 rounded-lg text-sm text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all border border-dark-700 hover:border-dark-600"
                            />
                            <FiSearch className="absolute right-3 top-3 h-4 w-4 text-dark-900" />
                        </div>
                    </div>

                    {/* Modules List */}
                    <div className="p-5 space-y-4">
                        <div className="text-xs uppercase tracking-wider text-dark-900 font-medium mb-2 flex items-center">
                            <span>Course Curriculum</span>
                            <span className="ml-auto text-xs text-dark-900">{modules.length} Modules</span>
                        </div>

                        {modules.map((module: IModule, idx) => (
                            <div key={module._id} className="mb-2">
                                {/* Module Header */}
                                <div
                                    onClick={() => toggleModule(module._id)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all flex justify-between items-center ${expandedModule === module._id
                                            ? 'bg-primary-800 shadow-sm border border-dark-700'
                                            : 'bg-primary-800 hover:bg-dark-750 border border-dark-800 hover:border-dark-700'
                                        }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`flex items-center justify-center h-9 w-9 rounded-lg ${expandedModule === module._id
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-dark-700 text-dark-900'
                                            }`}>
                                            <span className="font-medium text-sm">{idx + 1}</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-dark-100">{module.title}</div>
                                            <div className="text-xs text-dark-100 mt-1 flex items-center space-x-2">
                                                <span>{module.lectures?.length || 0} Lessons</span>
                                                <span>•</span>
                                                {/* <span>{calculateTotalDuration(module.lectures)}</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <FiChevronDown
                                        className={`w-5 h-5 text-dark-900 transition-transform duration-200 ${expandedModule === module._id ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>

                                {/* Lectures List */}
                                {expandedModule === module._id && (
                                    <div className="mt-3 ml-3 pl-5 border-l-2 border-dark-700 space-y-2 animate-fadeIn">
                                        {module.lectures.map((lecture: ILecture) => {
                                            const duration = lecture.duration || '5:00';
                                            const completed = lecture.isCompleted || false;

                                            return (
                                                <div
                                                    key={lecture._id}
                                                    onClick={() => handleLectureClick(lecture._id)}
                                                    className={`p-3 text-sm rounded-lg cursor-pointer transition-all flex justify-between items-center ${currentLectureId === lecture._id
                                                            ? 'bg-primary-800/70 text-white '
                                                            : completed
                                                                ? 'text-dark-900 hover:bg-primary-800 '
                                                                : 'text-dark-900 hover:bg-primary-800 '
                                                        }`}
                                                >
                                                    <div className="flex items-center">
                                                        <div className={`h-2 w-2 rounded-full mr-3 ${currentLectureId === lecture._id
                                                                ? 'bg-primary-400'
                                                                : completed
                                                                    ? 'bg-green-500'
                                                                    : 'bg-dark-600'
                                                            }`}></div>
                                                        <span className="truncate max-w-[180px]">{lecture.title}</span>
                                                        {completed && (
                                                            <FiCheckCircle className="ml-2 h-4 w-4 text-green-500 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-dark-900 ml-2 whitespace-nowrap">
                                                        {duration}
                                                    </span>
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
