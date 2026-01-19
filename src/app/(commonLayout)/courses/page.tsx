'use client'

import AllCourses from "@/components/pages/courses/AllCourses";
import CoursesHero from "@/components/pages/courses/CoursesHero";
import FeaturedCourse from "@/components/pages/courses/FeaturedCourse";
import { useGetCourseQuery } from "@/redux/api/courseApi";
import { useEffect, useState } from "react";
import Pagination from "@/components/Shared/Pagination";
import Loader from "@/components/Shared/Loader";
import CoursesCategories from "@/components/pages/courses/CoursesCategories";




export type IICourse = {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: string
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  featured?: boolean;
};



export default function CoursesPage() {
  const [activeCategory, setActiveCategory ] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetCourseQuery({ page, limit, searchTerm: searchQuery, category: activeCategory });

  const totalPages = data?.meta?.totalPage || 1;

  // Reset page to 1 when search or category changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, activeCategory]);

  if (isLoading) {
    return <Loader message="Fetching the best courses for you..." />;
  }

  const filteredCourses = data?.data || [];



  Todo:
  return (
    <>
      <div className="bg-dark-50 min-h-screen">
        {/* Hero Section */}
        <CoursesHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Featured Course */}
          <FeaturedCourse />
          {/* Categories */}
          <CoursesCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

          {/* All Courses */}
          < AllCourses filteredCourses={filteredCourses} activeCategory={activeCategory} />

          {/* Pagination Controls */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            variant="public"
          />
        </div>
      </div>
    </>
  );
};

