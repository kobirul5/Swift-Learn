'use client';

import { FiTwitter, FiLinkedin, FiGithub, FiAward } from 'react-icons/fi';
import Image from 'next/image';
import Heading from '../Heading';
import InstructorCarousel from './InstructorCarousel';

const Instructor = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Heading
        title='Meet Our'
        title2='Expert Instructors'
        subtitle='Learn from industry professionals with real-world experience'
        />
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Instructor Profile */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Instructor Image */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary-100">
                  <Image
                    src="/assets/Jhankar-Mahbub.png" // Replace with your image path
                    alt="Instructor Name"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Instructor Info */}
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-dark-900">Jhonkar Mahbub</h3>
                  <p className="text-primary font-medium mb-2">Senior Software Engineer</p>

                  <div className="flex justify-center sm:justify-start space-x-4 mt-3">
                    <a href="#" className="text-dark-500 hover:text-primary transition-colors">
                      <FiTwitter size={20} />
                    </a>
                    <a href="#" className="text-dark-500 hover:text-primary transition-colors">
                      <FiLinkedin size={20} />
                    </a>
                    <a href="#" className="text-dark-500 hover:text-primary transition-colors">
                      <FiGithub size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-6 text-dark-600">
                With over 10 years of experience in software development and education, Alex has helped thousands of students master complex programming concepts through practical, real-world examples.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-primary-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">10+</p>
                  <p className="text-sm text-dark-600">Years Experience</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">25K+</p>
                  <p className="text-sm text-dark-600">Students Taught</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-dark-600">Average Rating</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">12</p>
                  <p className="text-sm text-dark-600">Courses Created</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-md border border-dark-100">
              <h3 className="text-xl font-bold text-dark-900 mb-4">Teaching Philosophy</h3>
              <p className="text-dark-600">
                &quot;I believe in learning by doing. My courses focus on practical projects that help students build real skills they can use immediately in their careers.&quot;
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-dark-100">
              <h3 className="text-xl font-bold text-dark-900 mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Machine Learning'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-50 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-dark-100">
              <h3 className="text-xl font-bold text-dark-900 mb-4">Certifications</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FiAward className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">AWS Certified Solutions Architect</p>
                    <p className="text-sm text-dark-500">2022 - Present</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiAward className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Google Certified Professional Data Engineer</p>
                    <p className="text-sm text-dark-500">2021 - Present</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <InstructorCarousel/>
      </div>
    </section>
  );
};

export default Instructor;
