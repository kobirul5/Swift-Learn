import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface Props {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  modulesCount: number;
  isFeatured: boolean;
  category: string;
  updatedAt: string;
}

export default function CourseHeader({
  title,
  description,
  thumbnail,
  price,
  modulesCount,
  isFeatured,
  category,
  updatedAt,
}: Props) {

  return (
    <div className="bg-white rounded-3xl w-full shadow-xl overflow-hidden mb-10">
      <div className="flex flex-col">
        <div className="relative w-full h-full min-h-[500px]">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />

          {isFeatured && (
            <div className="absolute top-6 left-6 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              <div className="flex gap-2 justify-center items-center">
                <FaStar /> Featured Course
              </div>
            </div>
          )}
        </div>


        <div className="md:col-span-2 p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-dark-900 mb-6">{title}</h1>
          <p className="text-lg text-dark-600 mb-8 leading-relaxed text-justify ">{description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-sm text-dark-500 uppercase tracking-wider">Price</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">${price?.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-dark-500 uppercase tracking-wider">Modules</p>
              <p className="text-3xl font-bold text-dark-900 mt-2">{modulesCount}</p>
            </div>
            <div>
              <p className="text-sm text-dark-500 uppercase tracking-wider">Status</p>
              <p className="text-xl font-semibold text-green-600 mt-2">Published</p>
            </div>
            <div>
              <p className="text-sm text-dark-500 uppercase tracking-wider">Updated</p>
              <p className="text-lg font-medium text-dark-700 mt-2">
                {new Date(updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-dark-500 uppercase tracking-wider">Category</p>
              <p className="text-lg font-medium text-primary-600 mt-2">{category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}