import ContactManagement from "@/components/admin/contact/ContactManagement";

export default function AdminMessagesPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 rounded-2xl">
            <main className="p-4 md:p-6 lg:p-8">
                <ContactManagement />
            </main>
        </div>
    );
}
