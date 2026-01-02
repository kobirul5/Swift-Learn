'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Instructor {
  id: number;
  name: string;
  role: string;
  image: string;
}

const instructors: Instructor[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Senior Full-Stack Developer",
    image: "/assets/instructor2.jpg"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Data Science Lead",
    image: "/assets/instructor4.jpg"
  },
  {
    id: 3,
    name: "Marcus Rivera",
    role: "DevOps Engineer",
    image: "/assets/instructor3.jpg"
  },
  {
    id: 4,
    name: "Marcus Rivera",
    role: "DevOps Engineer",
    image: "/assets/instructor1.jpg"
  }
];

const InstructorCarousel = () => {
  return (
    <section className="pt-12 mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            navigation={{
              nextEl: '.instructor-swiper-button-next',
              prevEl: '.instructor-swiper-button-prev'
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            className="pb-12"
          >
            {instructors.map((instructor) => (
              <SwiperSlide key={instructor.id}>
                <div className="bg-white border border-primary-100/40 mb-2 rounded-xl shadow-md overflow-hidden h-full flex flex-col p-4">
                  <div className="relative h-64 rounded-xl">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex-grow text-center">
                    <h3 className="text-xl font-bold text-dark-900">{instructor.name}</h3>
                    <p className="text-primary-600 font-medium">{instructor.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="instructor-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md -ml-4 hover:bg-primary-100 transition-colors">
            <FiArrowLeft className="text-dark-700" />
          </button>
          <button className="instructor-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md -mr-4 hover:bg-primary-100 transition-colors">
            <FiArrowRight className="text-dark-700" />
          </button>
        </div>
    </section>
  );
};

export default InstructorCarousel;
