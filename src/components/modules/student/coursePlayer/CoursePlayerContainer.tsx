"use client"

import { useState, useEffect } from "react"
import { useGetModuleQuery } from "@/redux/api/courseApi"
import { IModule } from "@/type/module"
import { LectureSidebar } from "./LectureSidebar"
import { VideoPlayer } from "./VideoPlayer"

interface CoursePlayerContainerProps {
    courseId: string;
}

export function CoursePlayerContainer({ courseId }: CoursePlayerContainerProps) {
    const { data, isLoading, isError } = useGetModuleQuery(courseId)
    const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null)

    const modules: IModule[] = data?.data || []

    const handleLectureClick = (lectureId: string) => {
        setSelectedLectureId(lectureId)
    }

    // Derive the lecture to play
    // If user clicked, use that. Otherwise, default to first available lecture in the first module that has them.
    const effectiveLectureId = selectedLectureId || (
        modules.find(m => m.lectures && m.lectures.length > 0)?.lectures[0]?._id || null
    )

    // Derive current lecture and module
    let currentLecture = null
    let currentModule = null
    let activeModuleIndex = 0
    let activeLectureIndex = 0

    if (effectiveLectureId) {
        for (let mIdx = 0; mIdx < modules.length; mIdx++) {
            const module = modules[mIdx]
            const lIdx = module.lectures.findIndex(l => l._id === effectiveLectureId)
            if (lIdx !== -1) {
                currentLecture = module.lectures[lIdx]
                currentModule = module
                activeModuleIndex = mIdx
                activeLectureIndex = lIdx
                break
            }
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        )
    }

    if (isError || modules.length === 0) {
        return (
            <div className="text-center py-40">
                <h2 className="text-2xl font-bold text-gray-800">Oops! Content not found.</h2>
                <p className="text-gray-600 mt-2">We couldn't load the modules for this course.</p>
            </div>
        )
    }

    return (
        <div className="container px-4 mx-auto py-10 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Video Section */}
                <div className="lg:col-span-8 p-6 bg-primary-100/10 backdrop-blur-sm border border-primary-100/20 rounded-2xl overflow-hidden shadow-xl">
                    <VideoPlayer
                        currentLecture={currentLecture}
                        moduleIndex={currentModule ? activeModuleIndex : undefined}
                        lectureIndex={currentLecture ? activeLectureIndex : undefined}
                    />

                    {currentModule && (
                        <div className="mt-8 bg-white/50 p-4 rounded-xl border border-white">
                            <h2 className="text-lg font-semibold text-gray-700">Module {activeModuleIndex + 1}: {currentModule.title}</h2>
                            <p className="text-sm text-gray-500">Currently playing: <span className="text-primary-600 font-medium">{activeModuleIndex + 1}-{activeLectureIndex + 1}: {currentLecture?.title}</span></p>
                        </div>
                    )}
                </div>

                {/* Sidebar Section */}
                <div className="lg:col-span-4 h-[calc(100vh-120px)] sticky top-24">
                    <LectureSidebar
                        modules={modules}
                        currentLectureId={effectiveLectureId}
                        onLectureClick={handleLectureClick}
                    />
                </div>
            </div>
        </div>
    )
}
