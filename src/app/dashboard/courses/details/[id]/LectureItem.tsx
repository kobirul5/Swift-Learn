'use client';

import { FiDelete, FiFileText, FiVideo } from 'react-icons/fi';
import Link from 'next/link';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { ILecture } from '@/type/module';
import { useDeleteLectureMutation } from '@/features/courseAPI';


interface Props {
  lecture: ILecture;
}

export default function LectureItem({ lecture }: Props) {
  const [deleteLecture] = useDeleteLectureMutation();

  const handleDelete = async () => {
    Swal.fire({
      title: 'Delete Lecture?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteLecture(lecture._id);
        if (res) {
          toast.success('Lecture deleted');
          window.location.reload();
        } else {
          toast.error('Delete failed');
        }
      }
    });
  };

  return (
    <li className="flex justify-between items-center p-4 hover:bg-dark-50 transition">
      <Link href="#" className="flex gap-3 items-center group">
        <div className="p-2 rounded-lg bg-red-50 text-red-600">
          {lecture.videoUrl ? <FiVideo size={18} /> : <FiFileText size={18} />}
        </div>
        <div>
          <p className="text-dark-800 font-medium group-hover:text-red-600">{lecture.title}</p>
          <p className="text-xs text-dark-500">{lecture.videoUrl ? 'Video Lecture' : 'Reading Material'}</p>
        </div>
      </Link>
      <button
        onClick={handleDelete}
        className="inline-flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        <FiDelete size={16} />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </li>
  );
}
