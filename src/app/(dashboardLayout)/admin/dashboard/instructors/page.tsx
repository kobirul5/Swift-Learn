
import InstructorManagement from "@/components/admin/instructors/InstructorManagement";

const AdminInstructorPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 rounded-2xl">
            <main className="p-4 md:p-6 lg:p-8">
                <InstructorManagement />
            </main>
        </div>
    );
};

export default AdminInstructorPage;
