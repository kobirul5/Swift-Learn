import { FiAward, FiUsers, FiClock } from "react-icons/fi";

export default function CoursesHero() {
  return (
    <div className="relative bg-dark-900  overflow-hidden min-h-125 py-30 flex items-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: "url('/assets/courses-banner.jpg')" }}
      />

      {/* Rich Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-900/70 to-primary-900/40" />

      {/* Animated Glowing Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-125 h-125 bg-primary-500/40 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-100 h-100 bg-purple-500/40 rounded-full blur-[100px] animate-pulse delay-1000" />

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/ border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-gray-300 text-sm font-medium tracking-wide uppercase">Upgrade Your Skillset</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
            Explore the Limits of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-200 via-white to-primary-200 animate-gradient-x">
              Human Potential
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Dive into our library of expert-led courses. Whether you want to master a new technology or refine your soft skills, we have the path for you.
          </p>

          {/* Glass Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <FiUsers className="w-6 h-6 text-primary-400" />, label: "10k+ Learners", sub: "Worldwide Community" },
              { icon: <FiAward className="w-6 h-6 text-purple-400" />, label: "Expert Mentors", sub: "Industry Leaders" },
              { icon: <FiClock className="w-6 h-6 text-blue-400" />, label: "Lifetime Access", sub: "Learn at your pace" },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 hover:bg-white/10 transition-colors duration-300">
                <div className="p-3 rounded-xl bg-white/5">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-lg">{stat.label}</h3>
                  <p className="text-gray-400 text-xs">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
