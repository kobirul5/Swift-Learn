import ContactUs from "@/components/pages/home/ContectUs";
import CoursesSection from "@/components/pages/home/CoursesSection";
import FAQ from "@/components/pages/home/FAQ";
import HeroBanner from "@/components/pages/home/HeroBanner";
import Instructor from "@/components/pages/home/Instructors";
import Testimonials from "@/components/pages/home/Testimonials";



export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <CoursesSection/>
      <Instructor/>
      <Testimonials/>
      <FAQ/>
      <ContactUs/>
    </div>
  );
}
