
interface CoursesHeroProps {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function CoursesCategories({activeCategory, setActiveCategory}:CoursesHeroProps) {

    const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Marketing', 'Business'];

    return (
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${activeCategory === category
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-dark-700 hover:bg-dark-100 shadow-sm'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}
