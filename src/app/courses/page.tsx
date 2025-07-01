'use client'
import { useState } from 'react';
import type { IICourse } from '@/type/course.interface';
import CoursesHero from '@/components/CoursesComponents/CoursesHero';
import CoursesCategories from '@/components/CoursesComponents/CoursesCategories';
import FeaturedCourse from '@/components/CoursesComponents/FeaturedCourse';
import AllCourses from '@/components/CoursesComponents/AllCourses';


export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');



  const courses: IICourse[] = [
    {
      id: 1,
      title: 'Complete React Developer in 2024',
      instructor: 'Alex Johnson',
      category: 'Web Development',
      level: 'Intermediate',
      duration: '32 hours',
      students: 12453,
      rating: 4.8,
      price: 89.99,
      image: '/courses/app-development.png',
      featured: true
    },
    {
      id: 2,
      title: 'Python for Data Science',
      instructor: 'Maria Garcia',
      category: 'Data Science',
      level: 'Beginner',
      duration: '24 hours',
      students: 8765,
      rating: 4.7,
      price: 74.99,
      image: '/courses/python.png'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Sam Wilson',
      category: 'Design',
      level: 'Beginner',
      duration: '18 hours',
      students: 6543,
      rating: 4.6,
      price: 59.99,
      image: '/courses/devops.png'
    },
    {
      id: 4,
      title: 'Advanced JavaScript Patterns',
      instructor: 'Taylor Smith',
      category: 'Web Development',
      level: 'Advanced',
      duration: '28 hours',
      students: 5432,
      rating: 4.9,
      price: 94.99,
      image: '/courses/devops.png'
    },
    {
      id: 5,
      title: 'Digital Marketing Masterclass',
      instructor: 'Jordan Lee',
      category: 'Marketing',
      level: 'Intermediate',
      duration: '22 hours',
      students: 7654,
      rating: 4.5,
      price: 69.99,
      image: '/images/digital-marketing.jpg'
    },
    {
      id: 6,
      title: 'Business Analytics Fundamentals',
      instructor: 'Chris Taylor',
      category: 'Business',
      level: 'Beginner',
      duration: '20 hours',
      students: 4321,
      rating: 4.4,
      price: 64.99,
      image: '/courses/python.png'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  


  return (
    <>
      <div className="bg-dark-50 min-h-screen">
        {/* Hero Section */}
        <CoursesHero  searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Featured Course */}
           <FeaturedCourse/>
          {/* Categories */}
          <CoursesCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

          {/* All Courses */}
          < AllCourses filteredCourses={filteredCourses} activeCategory={activeCategory} />
        </div>
      </div>
    </>
  );
};

