"use client"
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useState } from "react";
import { useGetApprovedTestimonialsQuery } from "@/redux/api/testimonialApi";

interface ITestimonial {
  _id: string;
  user: {
    name: string;
    image: string;
    education: string;
    role: string;
  };
  rating: number;
  content: string;
  accentColor: string;
}

const Testimonials = () => {
  const { data: testimonialsResponse, isLoading } = useGetApprovedTestimonialsQuery({});
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonialsData: ITestimonial[] = testimonialsResponse?.data || [];
  const currentTestimonial = testimonialsData[activeIndex];

  if (isLoading) {
    return (
      <section className="bg-linear-to-r from-primary-800 to-primary-200 py-20 my-20 flex justify-center items-center">
        <div className="text-white text-xl">Loading testimonials...</div>
      </section>
    );
  }

  if (testimonialsData.length === 0) {
    return null;
  }

  return (
    <section className="bg-linear-to-r from-primary-800 to-primary-200 py-20 my-20 text-black">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-8">
        {/* Left Side */}
        <div className="flex flex-col items-start">
          <p className="text-sm uppercase text-primary-100 font-semibold mb-2">
            Testimonials
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-dark-400 mb-6 leading-tight">
            What Our Clients <span className="text-primary-400">Say About Us</span>
          </h2>

          {/* Client Info */}
          <div className="flex items-center gap-4 mt-6">
            <div className="relative w-16 h-16">
              <Image
                src={currentTestimonial?.user?.image || "https://i.ibb.co/G4yDhqLg/man-7.jpg"}
                alt={currentTestimonial?.user?.name || ""}
                fill
                className="rounded-full object-cover border-4 border-main"
              />
            </div>
            <div>
              <p className="text-lg text-dark-200 font-semibold">
                {currentTestimonial?.user?.name}
              </p>
              <p className="text-sm text-dark-100">
                {currentTestimonial?.user?.education || currentTestimonial?.user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Swiper */}
        <div>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={testimonialsData.length > 1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-[350px] md:w-full mx-auto"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="px-6 py-16 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden group bg-white">
                  {/* Decorative Circle */}
                  <div
                    className={`absolute -top-16 -left-16 h-40 w-40 ${testimonial.accentColor} rounded-full opacity-10 group-hover:scale-[12] group-hover:-top-full group-hover:-left-full transition-all duration-500`}
                    style={{ transformOrigin: "top left" }}
                  ></div>

                  {/* Content */}
                  <div className="z-10 relative">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-dark-300"
                            } text-lg`}
                        />
                      ))}
                    </div>
                    <FaQuoteLeft className="text-dark-300 text-3xl mb-4" />
                    <p className="mb-6 text-lg leading-relaxed text-dark-600">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
