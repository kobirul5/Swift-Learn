
import { FiCode, FiDatabase, FiSmartphone, FiServer } from 'react-icons/fi';
import CourseCard from './CourseCard';
import Heading from '../Heading';


const CoursesSection = () => {
  const programmingCourses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Master the basics of JavaScript and modern ES6+ features to build interactive web applications.",
      price: 29.99,
      thumbnail: "https://i.ibb.co/cS00bL7Q/Java-Script-Fundamentals.jpg",
      icon: <FiCode className="text-yellow-500" />,
      category: "Web Development"
    },
    {
      id: 2,
      title: "Python for Data Science",
      description: "Learn Python programming with NumPy, Pandas, and Matplotlib for data analysis and visualization.",
      price: 39.99,
      thumbnail: "/courses/app-development.png",
      icon: <FiDatabase className="text-blue-500" />,
      category: "Data Science"
    },
    {
      id: 3,
      title: "Mobile App Development with Flutter",
      description: "Build beautiful cross-platform mobile apps using Flutter and Dart programming language.",
      price: 34.99,
      thumbnail: "/courses/python.png",
      icon: <FiSmartphone className="text-green-500" />,
      category: "Mobile Development"
    },
    {
      id: 4,
      title: "Node.js Backend Mastery",
      description: "Create robust backend services with Node.js, Express, and MongoDB database.",
      price: 44.99,
      thumbnail: "/courses/devops.png",
      icon: <FiServer className="text-red-500" />,
      category: "Backend Development"
    }
  ];

  return (
    <section className="pt-12 ">
      <div className="container mx-auto px-4">
        <Heading
        title='Our'
        title2='Courses'
        subtitle='Learn in-demand programming skills from industry experts with hands-on projects.'
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programmingCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;