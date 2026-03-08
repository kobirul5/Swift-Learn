"use client";

import { useLogoutUserMutation } from "@/redux/api/auth";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
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
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser(undefined).unwrap();

            // Clear global state (handles localStorage and Cookies)
            dispatch(logout());

            toast.success("Successfully logged out");

            // Execute callback if provided
            if (onLogoutSuccess) {
                onLogoutSuccess();
            }

            // Redirect to home
            router.push("/");
            router.refresh(); // Ensure server components re-evaluate
        } catch (error) {
            console.error("Logout failed:", error);
            // Even if the server call fails, we should clear global state
            dispatch(logout());
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
