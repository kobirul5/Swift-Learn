'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IModule } from '@/type/module';
import { useGetModuleQuery } from '@/features/moduleAndLectureAPI';
import VideoForLecture from './VideoForLecture';

import LectureSidebar from './LectureSidebar';

const LearningPlatform = () => {
    const params = useParams();
    const { data, isLoading } = useGetModuleQuery(params.id);

    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const [currentLectureId, setCurrentLectureId] = useState<string | null>(null);
    const [modules, setModules] = useState<IModule[]>()

    useEffect(() => {
        if (!data) return;

        if (data.data) {
            setModules(data.data);

            if (data.data.length > 0) {
                const firstModule = data.data[0];
                setExpandedModule(firstModule._id);

                if (firstModule.lectures && firstModule.lectures.length > 0) {
                    setCurrentLectureId(firstModule.lectures[0]._id);
                }
            }
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
                <LectureSidebar
                currentLectureId={currentLectureId}
                expandedModule={expandedModule}
                handleLectureClick={handleLectureClick}
                modules={modules}
                toggleModule={toggleModule}
                />


            </div>
        </div>
    );
};

export default LearningPlatform;
