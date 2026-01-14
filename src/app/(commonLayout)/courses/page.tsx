'use client'

import AllCourses from "@/components/pages/courses/AllCourses";
import CoursesHero from "@/components/pages/courses/CoursesHero";
import FeaturedCourse from "@/components/pages/courses/FeaturedCourse";
import { useGetCourseQuery } from "@/redux/api/courseApi";
import { useState } from "react";
import Pagination from "@/components/Shared/Pagination";




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
  const [activeCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState(1);
  const limit = 12;
  const { data, isLoading } = useGetCourseQuery({ page, limit });
  console.log("Courses Data:", data);

  const totalPages = data?.pagination?.totalPages || 1;


  if (isLoading) {
    return <h1 className="text-center my-40 mx-auto">Loading....</h1>;
  }



  const filteredCourses = data?.data.filter((course: IICourse) => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });



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
          {/* <CoursesCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} /> */}

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

