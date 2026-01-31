"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useGetCourseQuery } from "@/redux/api/courseApi";
import { ICourse } from "@/type/course.interface";

interface CourseSearchBarProps {
  className?: string;
  inputClassName?: string;
  isMobile?: boolean;
}

const CourseSearchBar = ({ 
  className = "relative group", 
  inputClassName = "pl-10 pr-4 py-2 rounded-full border border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary/80 text-sm w-64 transition-all duration-300",
  isMobile = false 
}: CourseSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: searchData, isFetching } = useGetCourseQuery(
    { searchTerm: debouncedTerm, limit: 5 }, 
    { skip: !debouncedTerm }
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const query = searchParams.get("searchTerm");
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const handleSearch = (term?: string) => {
    const query = term || searchTerm;
    if (query.trim()) {
      router.push(`/courses?searchTerm=${query}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (courseId: string) => {
    router.push(`/courses/details/${courseId}`);
    setShowSuggestions(false);
    setSearchTerm("");
  };

  return (
    <div className={isMobile ? "relative" : className}>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className={isMobile ? "pl-10 pr-4 py-2 rounded-full border border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary/80 text-sm w-full" : inputClassName}
      />
      <FiSearch
        className="absolute left-3 top-2.5 text-dark-400 cursor-pointer"
        onClick={() => handleSearch()}
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && debouncedTerm && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-dark-100 overflow-hidden z-50">
          {isFetching ? (
            <div className="p-3 text-center text-sm text-dark-500">Loading...</div>
          ) : searchData?.data?.length > 0 ? (
            <ul>
              {searchData.data.map((course: ICourse) => (
                <li
                  key={course._id}
                  onClick={() => handleSuggestionClick(course._id)}
                  className="px-4 py-2 hover:bg-dark-50 cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <FiSearch className="text-dark-400 shrink-0" size={14} />
                  <span className="text-dark-700 text-sm truncate">{course.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-center text-sm text-dark-500">No courses found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSearchBar;
