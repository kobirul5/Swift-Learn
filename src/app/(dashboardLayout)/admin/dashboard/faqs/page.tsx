import FAQManagement from "@/components/admin/faqs/FAQManagement";

export default function AdminFaqsPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 rounded-2xl">
            <main className="p-4 md:p-6 lg:p-8">
                <FAQManagement />
            </main>
        </div>
    );
}
