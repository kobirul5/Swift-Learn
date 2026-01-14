import { CoursePlayerContainer } from "@/components/modules/student/coursePlayer/CoursePlayerContainer";

interface PageProps {
    params: Promise<{ id: string }>;
}

const LearningPlatformPage = async ({ params }: PageProps) => {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-gray-50">
            <CoursePlayerContainer courseId={id} />
        </main>
    );
};

export default LearningPlatformPage;
