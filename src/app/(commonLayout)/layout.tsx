import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-[calc(100vh-320px)] bg-gray-50">
        {children}
      </div>
      <Footer />
    </div>
  );
}
