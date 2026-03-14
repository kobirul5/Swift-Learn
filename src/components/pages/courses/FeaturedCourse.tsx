import { useGetFeaturedCoursesQuery } from "@/redux/api/courseApi";
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function FeaturedCourse() {
    const { data: featuredData, isLoading } = useGetFeaturedCoursesQuery(undefined);

    if (isLoading) {
        return <div className="animate-pulse h-[450px] bg-gray-200 rounded-3xl mb-16"></div>;
    }

    const featuredCourses = featuredData?.data || [];

    if (featuredCourses.length === 0) return null;

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-dark-800 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary-600 rounded-full"></span>
                Featured Courses
            </h2>
            
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="featured-swiper rounded-3xl shadow-2xl overflow-hidden pb-12!"
            >
                {featuredCourses.map((course: any) => (
                    <SwiperSlide key={course._id}>
                        <div className="bg-white group relative">
                            <div className="md:flex min-h-[400px]">
                                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                                    <Image
                                        alt={course.title}
                                        src={course.thumbnail || '/assets/courses-banner.jpg'}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent"></div>
                                </div>
                                
                                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-white relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {course.category}
                                        </span>
                                        {course.isFeatured && (
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-3xl lg:text-4xl font-extrabold text-dark-900 mb-4 group-hover:text-primary-600 transition-colors">
                                        {course.title}
                                    </h3>
                                    
                                    <p className="text-dark-600 text-lg mb-6 line-clamp-2 italic">
                                        "Explore this featured course and master new skills with our expert instructors."
                                    </p>
                                    
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg border-2 border-white shadow-sm">
                                            {course.instructor?.[0] || 'I'}
                                        </div>
                                        <div>
                                            <p className="text-dark-900 font-semibold leading-none mb-1">
                                                {course.instructor || 'Expert Instructor'}
                                            </p>
                                            <p className="text-dark-500 text-sm leading-none">Course Mentor</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-auto">
                                        <div>
                                            <p className="text-dark-500 text-sm mb-1 uppercase tracking-widest font-medium">Investment</p>
                                            <span className="text-3xl font-black text-dark-900">${course.price}</span>
                                        </div>
                                        <Link 
                                            href={`/courses/details/${course._id}`} 
                                            className="px-8 py-4 bg-primary-600 hover:bg-dark-900 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .featured-swiper .swiper-button-next,
                .featured-swiper .swiper-button-prev {
                    color: white;
                    background: rgba(0, 0, 0, 0.4);
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    backdrop-filter: blur(8px);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    opacity: 0;
                }
                .featured-swiper:hover .swiper-button-next,
                .featured-swiper:hover .swiper-button-prev {
                    opacity: 1;
                }
                .featured-swiper .swiper-button-next:after,
                .featured-swiper .swiper-button-prev:after {
                    font-size: 18px;
                    font-weight: 900;
                }
                .featured-swiper .swiper-button-next:hover,
                .featured-swiper .swiper-button-prev:hover {
                    background: #EF4444;
                    transform: scale(1.1);
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
                }
                .featured-swiper .swiper-pagination-bullet {
                    background: #CBD5E1;
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                    transition: all 0.3s;
                }
                .featured-swiper .swiper-pagination-bullet-active {
                    background: #EF4444;
                    width: 30px;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    )
}
