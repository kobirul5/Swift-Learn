'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Heading from '../Heading';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "How do I enroll in a course?",
    answer: "Click the 'Enroll Now' button on any course page, complete the payment process, and you'll get immediate access to the course materials."
  },
  {
    id: 2,
    question: "Can I access courses on mobile devices?",
    answer: "Yes, all our courses are fully responsive and can be accessed on smartphones, tablets, and desktop computers."
  },
  {
    id: 3,
    question: "What's the refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with a course, contact our support team for a full refund."
  },
  {
    id: 4,
    question: "Do courses provide certificates?",
    answer: "Yes, upon completing all course requirements, you'll receive a downloadable certificate of completion."
  },
  {
    id: 5,
    question: "How long do I have access to purchased courses?",
    answer: "You get lifetime access to all courses you purchase, including future updates to the course materials."
  }
];

const FAQ = () => {
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setActiveId(prevId => (prevId === id ? null : id));
  };

  return (
    <section className="pb-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Heading
        title='Frequently Asked '
        title2 = 'Questions'
        subtitle='Everything you need to know about our learning platform'
        />

        {/* FAQ List */}
        <div className="space-y-4 max-w-[90%] mx-auto ">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-primary-100/50 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-dark-200/70"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex justify-between items-center p-6 text-left group"
                aria-expanded={activeId === faq.id}
              >
                <h3 className="text-lg font-medium text-dark-900 group-hover:text-primary-600 transition-colors">
                  {faq.question}
                </h3>
                {activeId === faq.id ? (
                  <FiChevronUp className="text-primary-600 text-xl" />
                ) : (
                  <FiChevronDown className="text-dark-400 group-hover:text-primary-600 text-xl" />
                )}
              </button>

              {activeId === faq.id && (
                <div className="px-6 pb-6 -mt-2">
                  <p className="text-dark-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
