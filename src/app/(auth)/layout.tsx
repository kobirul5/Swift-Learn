import { Toaster } from "react-hot-toast";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster></Toaster>
      {children}
    </div>
  );
}
