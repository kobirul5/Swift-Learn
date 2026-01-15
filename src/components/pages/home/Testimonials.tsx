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
  name: string;
  designation: string;
  rating: number;
  content: string;
  image: string;
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
        <div className="flex flex-col items-start h-full justify-center">
          <p className="text-sm uppercase text-primary-100 font-semibold mb-2">
            Testimonials
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-dark-400 mb-6 leading-tight">
            What Our Clients <span className="text-primary-400">Say About Us</span>
          </h2>

          {/* Client Info - Card Style */}
          <div
            key={currentTestimonial?._id}
            className="flex items-center gap-5 mt-8 bg-white/20 backdrop-blur-lg p-5 rounded-2xl border border-white/30 shadow-2xl animate-in fade-in slide-in-from-left-4 duration-500"
          >
            <div className="relative w-20 h-20 shrink-0">
              <Image
                src={currentTestimonial?.image || "https://i.ibb.co/G4yDhqLg/man-7.jpg"}
                alt={currentTestimonial?.name || "Client"}
                fill
                className="rounded-full object-cover border-4 border-white/50 shadow-lg"
              />
            </div>
            <div>
              <p className="text-xl text-white font-bold tracking-tight">
                {currentTestimonial?.name}
              </p>
              <p className="text-primary-100 font-medium text-sm opacity-90 mt-1 uppercase tracking-wider">
                {currentTestimonial?.designation}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Swiper */}
        <div className="rounded-xl">
          <Swiper
            key={testimonialsData.length} // Force re-init if count changes
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={testimonialsData.length > 1}
            onActiveIndexChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-[350px] md:w-full mx-auto rounded-xl"
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


// "use client"
// import Image from "next/image";
// import { FaQuoteLeft, FaStar } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import { useState } from "react";

// interface ITestimonial {
//   id: number;
//   name: string;
//   designation: string;
//   rating: number;
//   content: string;
//   image: string;
//   accentColor: string;
// }

// const testimonialsData: ITestimonial[] = [
//   {
//     id: 1,
//     name: "Arman Kahn",
//     designation: "University Student",
//     rating: 5,
//     content:
//       "SwiftLearn has completely changed how I study. The structured courses and video lectures helped me prepare for my semester exams with ease.",
//     image: "https://i.ibb.co/G4yDhqLg/man-7.jpg",
//     accentColor: "bg-purple-500",
//   },
//   {
//     id: 2,
//     name: "Arif Chowdhury",
//     designation: "Freelance Photographer",
//     rating: 4,
//     content:
//       "I wanted to learn design principles to improve my editing. SwiftLearn Learning gave me everything in one place—videos, notes, and expert tips. Loved it!",
//     image: "https://i.ibb.co/CKGcCQRb/man-6.jpg",
//     accentColor: "bg-indigo-500",
//   },
//   {
//     id: 3,
//     name: "Rifat Sorkar",
//     designation: "Travel Blogger",
//     rating: 5,
//     content:
//       "While traveling, I took web development courses from SwiftLearn Learning. The mobile-friendly design and progress tracking made it super flexible for me.",
//     image: "https://i.ibb.co/1GY99B8b/man-4.jpg",
//     accentColor: "bg-pink-500",
//   },
// ];


// const Testimonials = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const currentTestimonial = testimonialsData[activeIndex];

//   return (
//     <section className="bg-gradient-to-r from-primary-800 to-primary-200 py-20 my-20 text-black">
//       <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-8">
//         {/* Left Side */}
//         <div className="flex flex-col items-start">
//           <p className="text-sm uppercase text-primary-100 font-semibold mb-2">
//             Testimonials
//           </p>
//           <h2 className="text-2xl md:text-4xl font-bold text-dark-400 mb-6 leading-tight">
//             What Our Clients <span className="text-primary-400">Say About Us</span>
//           </h2>

//           {/* Client Info */}
//           <div className="flex items-center gap-4 mt-6">
//             <div className="relative w-16 h-16">
//               <Image
//                 src={currentTestimonial.image}
//                 alt={currentTestimonial.name}
//                 fill
//                 className="rounded-full object-cover border-4 border-main"
//               />
//             </div>
//             <div>
//               <p className="text-lg text-dark-200 font-semibold">
//                 {currentTestimonial.name}
//               </p>
//               <p className="text-sm text-dark-100">{currentTestimonial.designation}</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Swiper */}
//         <div>
//           <Swiper
//             modules={[Navigation, Pagination, A11y, Autoplay]}
//             spaceBetween={30}
//             slidesPerView={1}
//             pagination={{ clickable: true }}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//             }}
//             loop={true}
//             onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//             className="w-[350px] md:w-full mx-auto"
//           >
//             {testimonialsData.map((testimonial) => (
//               <SwiperSlide key={testimonial.id}>
//                 <div className="px-6 py-16 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden group bg-white">
//                   {/* Decorative Circle */}
//                   <div
//                     className={`absolute -top-16 -left-16 h-40 w-40 ${testimonial.accentColor} rounded-full opacity-10 group-hover:scale-[12] group-hover:-top-full group-hover:-left-full transition-all duration-500`}
//                     style={{ transformOrigin: "top left" }}
//                   ></div>

//                   {/* Content */}
//                   <div className="z-10 relative">
//                     <div className="flex items-center mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar
//                           key={i}
//                           className={`${
//                             i < testimonial.rating
//                               ? "text-yellow-400"
//                               : "text-dark-300"
//                           } text-lg`}
//                         />
//                       ))}
//                     </div>
//                     <FaQuoteLeft className="text-dark-300 text-3xl mb-4" />
//                     <p className="mb-6 text-lg leading-relaxed text-dark-600">
//                       {testimonial.content}
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
