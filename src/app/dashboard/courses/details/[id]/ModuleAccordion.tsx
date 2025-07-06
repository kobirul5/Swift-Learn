'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { IModule } from '@/type/module';
import ModuleItem from './ModuleItem';


interface Props {
  id: string;
}

export default function ModuleAccordion({ id }: Props) {
  const [modules, setModules] = useState<IModule[]>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const axiosPublic = useAxiosPublic();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axiosPublic.get(`/api/modules/${id}`);
        if (res.data.success) {
          setModules(res.data.data);
        } else {
          toast.error('Failed to load modules');
        }
      } catch (error) {
        toast.error('Something went wrong');
        console.log(error)
      }
    };
    fetchModules();
  }, [axiosPublic, id]);

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
