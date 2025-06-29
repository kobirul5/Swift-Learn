import ContactUs from "@/components/Home/ContectUs";
import CoursesSection from "@/components/Home/CoursesSection";
import FAQ from "@/components/Home/FAQ";
import HeroBanner from "@/components/Home/HeroBanner";
import Instructor from "@/components/Home/Instructors";
import Testimonials from "@/components/Home/Testimonials";


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
