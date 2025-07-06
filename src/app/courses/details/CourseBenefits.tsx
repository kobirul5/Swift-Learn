'use client';

import Heading from '@/components/Heading';
import React from 'react';
import { FaChalkboardTeacher, FaCertificate, FaUsers, FaClock, FaVideo, FaPuzzlePiece, FaClipboardCheck, FaQuestionCircle, FaRocket } from 'react-icons/fa';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <FaClock className="text-2xl text-primary-600" />,
    title: '6 Months Access',
    description: 'Enjoy full access to course content for 6 months from enrollment.',
  },
  {
    icon: <FaChalkboardTeacher className="text-2xl text-primary-600" />,
    title: 'Weekly Live Support',
    description: 'Join live Q&A sessions every week with expert instructors.',
  },
  {
    icon: <FaVideo className="text-2xl text-primary-600" />,
    title: 'Lifetime Access to Recordings',
    description: 'Get lifetime access to all class recordings to review anytime.',
  },
  {
    icon: <FaPuzzlePiece className="text-2xl text-primary-600" />,
    title: 'Project-Based Learning',
    description: 'Build real-world projects that strengthen your portfolio.',
  },
  {
    icon: <FaCertificate className="text-2xl text-primary-600" />,
    title: 'Certificate of Completion',
    description: 'Receive a professional certificate after finishing the course.',
  },
  {
    icon: <FaRocket className="text-2xl text-primary-600" />,
    title: 'Job Preparation Support',
    description: 'Guidance for resumes, interviews, and freelancing tips.',
  },
  {
    icon: <FaUsers className="text-2xl text-primary-600" />,
    title: 'Private Community Access',
    description: 'Connect with learners and mentors in an exclusive group.',
  },
  {
    icon: <FaQuestionCircle className="text-2xl text-primary-600" />,
    title: 'Doubt Clearing Help',
    description: 'Clear your technical doubts with mentor support.',
  },
  {
    icon: <FaClipboardCheck className="text-2xl text-primary-600" />,
    title: 'Assignments & Quizzes',
    description: 'Practice regularly with structured assignments and quizzes.',
  },
];

const CourseBenefits: React.FC = () => {
  return (
    <section className="py-16 mx-auto">
      <Heading title='What You Will Get from' title2='the Course' subtitle='' />
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="hover:border bg-white border-primary-100 rounded-xl p-6 shadow hover:shadow-lg transition">
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-dark-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseBenefits;
