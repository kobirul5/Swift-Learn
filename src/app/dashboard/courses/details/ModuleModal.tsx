import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";

interface ModuleModalProps {
    setShow: (value: boolean) => void;
    courseId: string;
}
export default function ModuleModal({ setShow, courseId }: ModuleModalProps) {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const axiosPublic = useAxiosPublic()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newModule = {
            course: courseId,
            title,
            description,
            isActive,
        };

        try {
            const res = await axiosPublic.post("/api/modules/create", newModule)

            if (res.data?.success) {
                toast.success("Module created successfully!");
                setShow(false); 
            } else {
                toast.error("Module creation failed!");
            }
        } catch (error: unknown) {
            console.error(error);
            toast.error("something is wrong");
        }

};



return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-white shadow p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Module</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label>Is Active</label>
                </div>


                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => setShow(false)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
)
}
