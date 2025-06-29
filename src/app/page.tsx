import CoursesSection from "@/components/Home/CoursesSection";
import FAQ from "@/components/Home/FAQ";
import HeroBanner from "@/components/Home/HeroBanner";
import Testimonials from "@/components/Home/Testimonials";


export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <CoursesSection/>
      <Testimonials/>
      <FAQ/>
    </div>
  );
}
