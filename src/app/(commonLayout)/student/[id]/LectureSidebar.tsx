"use client"

import { useState } from "react"
import { Search, CheckCircle2, Lock, Play, ChevronDown } from "lucide-react"
import { cn } from "@/utils/cd"

interface Lesson {
  id: string
  title: string
  duration: string
  status: "completed" | "active" | "locked"
  type: "video" | "text"
}

interface Module {
  id: string
  title: string
  totalDuration: string
  progress: string
  lessons: Lesson[]
}

const coursesData: Module[] = [
  {
    id: "module-65",
    title: "Module 65: AI Basics",
    totalDuration: "18 min",
    progress: "2/2",
    lessons: [
      {
        id: "65-8",
        title: "65-8 Setting up the AI emphasized Hero section",
        duration: "9 min",
        status: "completed",
        type: "video",
      },
      {
        id: "65-9",
        title: "65-9 Hero section completion and tasks",
        duration: "9 min",
        status: "active",
        type: "video",
      },
    ],
  },
  {
    id: "module-66",
    title: "Module 66: PH Healthcare Frontend New Part-2",
    totalDuration: "2 h 9 m",
    progress: "0/11",
    lessons: [
      {
        id: "66-text",
        title: "Text Instruction: Module 66",
        duration: "",
        status: "locked",
        type: "text",
      },
      {
        id: "66-1",
        title: "66-1 Planning The Routing Architecture Of Ph Healthcare",
        duration: "15 min",
        status: "locked",
        type: "video",
      },
      {
        id: "66-2",
        title: "66-2 Routing Setup In The Project",
        duration: "12 min",
        status: "locked",
        type: "video",
      },
    ],
  },
]

export function LectureSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedModules, setExpandedModules] = useState<string[]>(["module-65"])
  const [loadedLessons, setLoadedLessons] = useState<string[]>(["65-8", "65-9"])

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    )

    if (!expandedModules.includes(moduleId)) {
      const moduleData = coursesData.find((m) => m.id === moduleId)
      if (moduleData) {
        const firstLessons = moduleData.lessons.slice(0, 3).map((l) => l.id)
        setLoadedLessons((prev) => [...new Set([...prev, ...firstLessons])])
        moduleData.lessons.slice(3).forEach((lesson, index) => {
          setTimeout(() => {
            setLoadedLessons((prev) => [...new Set([...prev, lesson.id])])
          }, (index + 1) * 500)
        })
      }
    }
  }

  const filteredModules = coursesData
    .map((module) => ({
      ...module,
      lessons: module.lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((module) => module.lessons.length > 0)

  return (
    <aside className="w-[430px] bg-[var(--color-primary-50)] border-r border-[var(--color-primary-100)] flex flex-col h-screen">
      {/* Search */}
      <div className="p-4 border-b border-[var(--color-primary-100)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-primary-400)]" />
          <input
            type="text"
            placeholder="Search Lesson"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] text-[var(--color-dark-900)] placeholder:text-[var(--color-primary-300)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)]"
          />
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        {filteredModules.map((module) => (
          <div key={module.id} className="border-b border-[var(--color-primary-200)]">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full px-4 py-4 flex items-start gap-3 hover:bg-[var(--color-primary-100)] transition-colors"
            >
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-[var(--color-primary-400)] mt-1 transition-transform flex-shrink-0",
                  expandedModules.includes(module.id) ? "rotate-0" : "-rotate-90"
                )}
              />
              <div className="flex-1 text-left">
                <h3 className="text-sm font-semibold text-[var(--color-dark-900)] leading-tight mb-1">{module.title}</h3>
                <div className="flex items-center gap-2 text-xs text-[var(--color-primary-400)]">
                  <span>{module.totalDuration}</span>
                  <span>•</span>
                  <span>{module.progress}</span>
                </div>
              </div>
            </button>

            {/* Lessons */}
            {expandedModules.includes(module.id) && (
              <div className="pb-2">
                {module.lessons.map((lesson) => {
                  const isLoaded = loadedLessons.includes(lesson.id)

                  if (!isLoaded) {
                    return (
                      <div
                        key={lesson.id}
                        className="px-4 py-3 mx-4 mb-2 rounded-lg bg-[var(--color-primary-100)]/50 animate-pulse"
                      >
                        <div className="h-4 bg-[var(--color-primary-200)] rounded w-3/4 mb-2" />
                        <div className="h-3 bg-[var(--color-primary-200)] rounded w-1/4" />
                      </div>
                    )
                  }

                  return (
                    <button
                      key={lesson.id}
                      className={cn(
                        "w-full px-4 py-3 mx-4 mb-2 rounded-lg text-left transition-all hover:bg-[var(--color-primary-200)]",
                        lesson.status === "active" &&
                          "bg-gradient-to-r from-[var(--color-primary-300)] to-[var(--color-primary-500)] hover:from-[var(--color-primary-400)] hover:to-[var(--color-primary-600)]",
                        lesson.status === "completed" && "bg-[var(--color-primary-100)]",
                        lesson.status === "locked" && "opacity-70"
                      )}
                      disabled={lesson.status === "locked"}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          {lesson.status === "completed" && <CheckCircle2 className="w-5 h-5 text-[var(--color-primary-500)]" />}
                          {lesson.status === "locked" && <Lock className="w-5 h-5 text-[var(--color-primary-300)]" />}
                          {lesson.status === "active" && lesson.type === "video" && (
                            <Play className="w-5 h-5 text-[var(--color-dark-900)]" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4
                            className={cn(
                              "text-sm font-medium mb-1 leading-snug",
                              lesson.status === "locked" ? "text-[var(--color-primary-400)]" : "text-[var(--color-dark-900)]"
                            )}
                          >
                            {lesson.title}
                          </h4>
                          {lesson.duration && (
                            <div className="flex items-center gap-2 text-xs text-[var(--color-primary-400)]">
                              <Play className="w-3 h-3" />
                              <span>{lesson.duration}</span>
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
    </aside>
  )
}
