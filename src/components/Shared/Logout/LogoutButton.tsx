"use client";

import { useLogoutUserMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { FiLogOut, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

interface LogoutButtonProps {
    onLogoutSuccess?: () => void;
    className?: string;
    showIcon?: boolean;
    text?: string;
}

const LogoutButton = ({
    onLogoutSuccess,
    className = "flex items-center space-x-1 text-dark-700 hover:text-primary transition-colors",
    showIcon = true,
    text = "Logout"
}: LogoutButtonProps) => {
    const [logoutUser, { isLoading }] = useLogoutUserMutation();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await logoutUser(undefined).unwrap();

            if (res.success) {
                toast.success(res.message || "Successfully logged out");
            }

            // Execute callback if provided
            if (onLogoutSuccess) {
                onLogoutSuccess();
            }

            // Redirect to home and refresh
            router.push("/");
            router.refresh();
        } catch (error: any) {
            console.error("Logout failed:", error);
            toast.error(error?.data?.message || "Logout failed");

            // Still clear local session and redirect
            router.push("/");
            router.refresh();
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? (
                <FiLoader className="animate-spin" />
            ) : (
                showIcon && <FiLogOut />
            )}
            <span>{isLoading ? "Logging out..." : text}</span>
        </button>
    );
};

export default LogoutButton;
