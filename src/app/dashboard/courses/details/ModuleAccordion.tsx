'use client';
import { useDeleteLectureMutation } from '@/features/courseAPI';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiDelete } from 'react-icons/fi';
import Swal from 'sweetalert2';

export interface ILecture {
    _id: string,
    module: string;
    course: string;
    title: string;
    videoUrl?: string;
    notes: string[];
}


export interface IModule {
    _id: string
    course: string;
    title: string;
    description: string;
    isActive: true;
    lectures: ILecture[];
    createdAt: Date;
    updatedAt: Date;
    moduleNumber: number,
}

interface Props {
    id: string;
}

export default function ModuleAccordion({ id }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [modules, setModules] = useState<IModule[]>()
    const [deleteLecture] = useDeleteLectureMutation(undefined)
    const axiosPublic = useAxiosPublic()

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const moduleFn = async () => {
            try {
                const res = await axiosPublic.get(`/api/modules/${id}`)
                
                if (res?.data.success) {
                    setModules(res.data.data)
                } else {
                    toast.error("Module creation failed!");
                   
                }
            } catch (error: unknown) {
                console.error(error);
                toast.error("something is wrong");
            }
        }
        moduleFn()

    }, [axiosPublic,id])

    const handleDeleteLecture = async (id: string) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            // const res = await axiosPublic.delete(`/api/lecture/${id}`)
            const res = await deleteLecture(id)
            if (res) {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
                window.location.reload()
            } else {
                toast.error("Delete fail");
                
            }


        });


    }


    if (!modules) {
        return <h1>module not found</h1>
    }

    return (
        <div className="space-y-4">
            {modules.map((module, index) => (
                <div key={module._id} className="border border-gray-300 rounded-xl overflow-hidden">
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                        <span className="text-left font-semibold text-lg">Module:{module.moduleNumber} {module.title}</span>
                        <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
                    </button>

                    {openIndex === index && (
                        <div className="p-4 bg-white border-t">
                            {module.lectures.length > 0 ? (
                                <ul className="list-disc list-inside space-y-2">
                                    {module.lectures.map((lecture, idx) => (
                                        <li key={idx} className="text-gray-700 flex justify-between gap-2 border mt-2 p-2 rounded-xl">
                                            <Link href={''} >
                                                <p>
                                                    {lecture?.title}
                                                </p>
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteLecture(lecture._id)}
                                                className='text-white flex justify-center items-center gap-2 btn bg-red-600'>Delete<FiDelete /></button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No lectures available.</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
