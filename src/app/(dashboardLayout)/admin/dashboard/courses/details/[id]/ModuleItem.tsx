'use client';

import { FiChevronDown, FiChevronUp, FiFileText, FiPlus } from 'react-icons/fi';
import LectureItem from './LectureItem';
import { IModule } from '@/type/module';
import { useState } from 'react';
import LectureModal from '@/components/Modals/LectureModal';

interface Props {
  module: IModule;
  index: number;
  isOpen: boolean;
  toggleAccordion: () => void;
}

export default function ModuleItem({ module, isOpen, toggleAccordion }: Props) {

  const [isOpenLecture, setIsOpenLecture] = useState<boolean>(false);

  const toggleModalLecture = () => setIsOpenLecture(!isOpenLecture);


  return (
    <div className="border border-dark-50 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Accordion Header */}
      <button
        onClick={toggleAccordion}
        className={`w-full flex justify-between rounded-xl items-center p-6 ${isOpen ? 'bg-primary-100' : 'bg-white hover:bg-dark-50'
          }`}
      >
        <div className="flex items-center gap-4 text-left">
          <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
            {module.moduleNumber}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{module.title}</h3>
            <p className="text-sm text-dark-500">{module.lectures.length} lectures</p>
          </div>
        </div>
        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="bg-white px-2 pb-4">
          {/* Lecture List */}
          {module.lectures.length > 0 ? (
            <ul className="divide-y divide-dark-100">
              {module.lectures.map((lecture) => (
                <LectureItem key={lecture._id} lecture={lecture} />
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-dark-500">
              <div className="w-12 h-12 mx-auto mb-2 bg-primary-100 rounded-full flex justify-center items-center">
                <FiFileText size={24} />
              </div>
              <p>No lectures yet</p>
            </div>
          )}

          {/* Add Lecture Button */}
          <div className="mt-4 text-right px-4">
            <button
              // onClick={() => console.log(`Add lecture to module ${module._id}`)}
              onClick={() => toggleModalLecture()}
              className="inline-flex items-center gap-2 text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <FiPlus /> Add Lecture
            </button>
            {isOpenLecture && (<LectureModal
              moduleId={module._id}
              toggleModalLecture={toggleModalLecture}
            />)}
          </div>
        </div>
      )}
    </div>
  );
}
