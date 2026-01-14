"use client"

import { useState, useEffect } from "react"
import { Search, Play, ChevronDown } from "lucide-react"
import { cn } from "@/utils/cd"
import { IModule } from "@/type/module"

interface LectureSidebarProps {
    modules: IModule[];
    currentLectureId: string | null;
    onLectureClick: (lectureId: string) => void;
}

export function LectureSidebar({ modules, currentLectureId, onLectureClick }: LectureSidebarProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [manualExpandedModules, setManualExpandedModules] = useState<string[] | null>(null)

    // Derive which modules should be expanded
    const activeModule = modules.find(m => m.lectures.some(l => l._id === currentLectureId))

    // If user hasn't toggled anything, default to active module or first module.
    // Otherwise, use the manually managed list.
    const expandedModules = manualExpandedModules ?? (
        activeModule ? [activeModule._id] : (modules.length > 0 ? [modules[0]._id] : [])
    )

    const toggleModule = (moduleId: string) => {
        setManualExpandedModules((prev) => {
            const current = prev ?? expandedModules
            return current.includes(moduleId)
                ? current.filter((id) => id !== moduleId)
                : [...current, moduleId]
        })
    }

    const filteredModules = modules
        .map((module) => ({
            ...module,
            lectures: module.lectures.filter((lecture) =>
                lecture.title.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter((module) => module.lectures.length > 0)

    return (
        <div className="w-full bg-primary-50 border border-primary-100 flex flex-col h-full rounded-lg overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-primary-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                    <input
                        type="text"
                        placeholder="Search Lesson"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 rounded-md bg-primary-100 border border-primary-200 text-primary-900 placeholder:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>
            </div>

            {/* Lessons List */}
            <div className="flex-1 overflow-y-auto">
                {filteredModules.map((module, moduleIndex) => (
                    <div key={module._id} className="border-b border-primary-200 last:border-b-0">
                        {/* Module Header */}
                        <button
                            onClick={() => toggleModule(module._id)}
                            className="w-full px-4 py-4 flex items-start gap-3 hover:bg-primary-100 transition-colors"
                        >
                            <ChevronDown
                                className={cn(
                                    "w-5 h-5 text-primary-400 mt-1 transition-transform flex-shrink-0",
                                    expandedModules.includes(module._id) ? "rotate-0" : "-rotate-90"
                                )}
                            />
                            <div className="flex-1 text-left">
                                <h3 className="text-sm font-semibold text-primary-900 leading-tight mb-1">
                                    Module {moduleIndex + 1}: {module.title}
                                </h3>
                            </div>
                        </button>

                        {/* Lessons */}
                        {expandedModules.includes(module._id) && (
                            <div className="pb-2">
                                {module.lectures.map((lecture, lectureIndex) => {
                                    const isActive = currentLectureId === lecture._id;

                                    return (
                                        <button
                                            key={lecture._id}
                                            onClick={() => onLectureClick(lecture._id)}
                                            className={cn(
                                                "w-[calc(100%-32px)] px-4 py-3 mx-4 mb-2 rounded-lg text-left transition-all",
                                                isActive
                                                    ? "bg-gradient-to-r from-primary-300 to-primary-500"
                                                    : "hover:bg-primary-200"
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Icon */}
                                                <div className="flex-shrink-0 mt-0.5">
                                                    <Play className={cn("w-5 h-5", isActive ? "text-primary-900" : "text-primary-400")} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <h4
                                                        className={cn(
                                                            "text-sm font-medium leading-snug",
                                                            isActive ? "text-primary-900" : "text-primary-900"
                                                        )}
                                                    >
                                                        {moduleIndex + 1}-{lectureIndex + 1}: {lecture.title}
                                                    </h4>
                                                    {lecture.duration && (
                                                        <div className="flex items-center gap-2 text-xs text-primary-400 mt-1">
                                                            <span>{lecture.duration}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
