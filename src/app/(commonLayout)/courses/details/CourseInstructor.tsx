"use client";

import Heading from "@/components/Heading";
import Image from "next/image";
import { FiAward, FiGithub, FiCode, FiDatabase, FiCpu } from "react-icons/fi";

interface Instructor {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const instructors: Instructor[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Senior Full-Stack Developer",
    description:
      "Expert in React, Node.js, and scalable cloud applications. Former Team Lead at TechNova Solutions with 7+ years of experience building robust web platforms.",
    image: "/assets/instructor2.jpg",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Data Science Lead",
    description:
      "Data Science Lead at InnovateX | Specializes in Machine Learning & AI-driven analytics | Former Research Analyst at DataLab Analytics.",
    image: "/assets/instructor4.jpg",
  },
  {
    id: 3,
    name: "Marcus Rivera",
    role: "DevOps Engineer",
    description:
      "DevOps Engineer at CloudEdge | Focused on CI/CD pipelines, infrastructure automation, and Kubernetes orchestration | AWS Certified Solutions Architect.",
    image: "/assets/instructor3.jpg",
  },
  {
    id: 4,
    name: "Emily Smith",
    role: "UI/UX Designer",
    description:
      "Creative UI/UX Designer at PixelWorks | Designs intuitive user experiences for web and mobile platforms | Former Visual Designer at BrightStudio.",
    image: "/assets/instructor1.jpg",
  },
  {
    id: 5,
    name: "Marcus Rivera",
    role: "DevOps Engineer",
    description:
      "DevOps Engineer at CloudEdge | Focused on CI/CD pipelines, infrastructure automation, and Kubernetes orchestration | AWS Certified Solutions Architect.",
    image: "/assets/instructor3.jpg",
  },
  {
    id: 6,
    name: "Emily Smith",
    role: "UI/UX Designer",
    description:
      "Creative UI/UX Designer at PixelWorks | Designs intuitive user experiences for web and mobile platforms | Former Visual Designer at BrightStudio.",
    image: "/assets/instructor1.jpg",
  },
];

export default function CourseInstructor() {
  return (
    <section className="pb-12">
      <div className="container mx-auto px-4">
        <Heading
        title="Meet Your"
        title2="Instructors"
        subtitle=""
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white border border-dark-200 rounded-xl shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 text-xs font-semibold rounded-full border border-primary-400">
                  <FiAward className="text-primary-600" /> {instructor.role}
                </span>
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  width={50}
                  height={50}
                  className="rounded-full border border-dark-300"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{instructor.name}</h3>
              <p className="text-sm text-dark-600 mb-4">
                {instructor.description}
              </p>
              <div className="flex items-center gap-4 border-t pt-4 text-dark-600 text-xl">
                <FiGithub />
                <FiCode />
                <FiDatabase />
                <FiCpu />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
