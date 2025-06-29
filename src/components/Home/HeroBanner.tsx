
import { FiPlay, FiSearch, FiAward, FiUsers } from 'react-icons/fi';
import Button from '../Button';
import HeroVideo from './HeroVideo';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const HeroBanner = () => {
  // Statistics data - easily configurable
  const stats: StatItem[] = [
    { icon: <FiPlay className="text-primary/80" />, value: '1,200+', label: 'Video Courses' },
    { icon: <FiAward className="text-primary/80" />, value: '500+', label: 'Certified Tutors' },
    { icon: <FiUsers className="text-primary/80" />, value: '50K+', label: 'Active Students' },
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary-100/30 to-primary-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content Section */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Learn New Skills With <span className="text-primary">Expert Tutors</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Join thousands of students learning at their own pace with our interactive courses. 
              Start your learning journey today.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent"
              />
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
              <Button className="absolute right-1.5 top-1.5">
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center overflow-hidden">
            <div className="relative w-full max-w-[650px]">
              <div className="relative aspect-video bg-primary-100 rounded-xl overflow-hidden shadow-lg">
                <HeroVideo/>
                
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-200 rounded-full opacity-20 -z-10"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-200 rounded-full opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;