'use client';

import { useEffect, useState } from 'react';
import { IModule } from '@/type/module';
import ModuleItem from './ModuleItem';
import { useGetModuleQuery } from '@/features/moduleAndLectureAPI';


interface Props {
  id: string;
}

export default function ModuleAccordion({ id }: Props) {
  const [modules, setModules] = useState<IModule[]>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const {data} = useGetModuleQuery(id)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {

    if(!data){
      return
    }
    setModules(data.data)
  }, [data]);

  if (!modules) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-dark-500">Loading modules...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-4 mx-auto px-4">
      {modules.map((module, index) => (
        <ModuleItem
          key={module._id}
          module={module}
          index={index}
          isOpen={openIndex === index}
          toggleAccordion={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
}
