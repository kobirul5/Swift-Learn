interface CoursesHeroProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function CoursesHero({ searchQuery, setSearchQuery }: CoursesHeroProps) {
  return (
    <div
      className="relative bg-cover bg-center min-h-[500px] flex justify-center items-center"
      style={{ backgroundImage: "url('/assets/courses-banner.jpg')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-white py-22">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Expand Your Knowledge</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover our comprehensive courses taught by industry experts
          </p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-6 py-4 bg-white rounded-lg shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
