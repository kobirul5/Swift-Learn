import Heading from '@/components/Heading';
import OurStory from '@/components/pages/about/OurStory';
import OurMission from '@/components/pages/about/OurMission';
import StatsSection from '@/components/pages/about/StatsSection';
import Instructor from '@/components/pages/home/Instructors';

export default function AboutPage() {

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 pt-10">
        <Heading
        title='About Our Learning'
        title2='Platform'
        subtitle='We&apos;re on a mission to make quality education accessible to everyone, everywhere.'
        />
      </section>

      <OurStory/>
      {/* Our Mission */}
      <OurMission/>

      {/* Team Section */}
      <Instructor/>

      {/* Stats Section */}
      <StatsSection/>
    </div>
  );
}