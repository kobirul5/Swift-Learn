'use client';

import Heading from '@/components/Heading';
import { useGetFaqsQuery } from '@/redux/api/faqApi';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const { data: faqs, isLoading } = useGetFaqsQuery({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setActiveId(prevId => (prevId === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!faqs || faqs.data.length === 0) {
    return null;
  }

  return (
    <section className="pb-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Heading
          title="Frequently Asked "
          title2="Questions"
          subtitle="Everything you need to know about our learning platform"
        />

        {/* FAQ List */}
        <div className="space-y-4 max-w-[90%] mx-auto ">
          {faqs.data.map((faq: any) => (
            <div
              key={faq._id}
              className="bg-primary-100/50 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-dark-200/70"
            >
              <button
                onClick={() => toggleFAQ(faq._id)}
                className="w-full flex justify-between items-center p-6 text-left group"
                aria-expanded={activeId === faq._id}
              >
                <h3 className="text-lg font-medium text-dark-900 group-hover:text-primary-600 transition-colors">
                  {faq.question}
                </h3>
                {activeId === faq._id ? (
                  <FiChevronUp className="text-primary-600 text-xl" />
                ) : (
                  <FiChevronDown className="text-dark-400 group-hover:text-primary-600 text-xl" />
                )}
              </button>

              {activeId === faq._id && (
                <div className="px-6 pb-6">
                  <p className="text-dark-600 whitespace-pre-wrap">{faq.answer}</p>
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
