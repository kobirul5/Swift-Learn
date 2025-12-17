import ContactUs from "@/components/modules/Home/ContectUs";
import CoursesSection from "@/components/modules/Home/CoursesSection";
import FAQ from "@/components/modules/Home/FAQ";
import HeroBanner from "@/components/modules/Home/HeroBanner";
import Instructor from "@/components/modules/Home/Instructors";
import Testimonials from "@/components/modules/Home/Testimonials";



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
