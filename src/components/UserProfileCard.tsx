"use client";
import { useGetUserQuery } from "@/redux/api/userApi";
import Image from "next/image";

export default function UserProfileCard() {
  const { data, isLoading } = useGetUserQuery(undefined);

  return (
    <div className="flex items-center">
      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
        <span className="text-primary-600 font-medium rounded-full w-8 h-8 ">
          <Image
            src={data?.data?.image}
            alt="logo"
            width={32}
            height={32}
            className="w-full h-full object-cover rounded-full"
          />
        </span>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-dark-700">
          {" "}
          {isLoading ? "User" : data?.data?.name}
        </p>
        <p className="text-xs font-medium text-dark-500">View profile</p>
      </div>
    </div>
  );
}
