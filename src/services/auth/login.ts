/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";
import { parse } from "cookie";
import { cookies } from "next/headers";

const loginValidationZodSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
})

export const loginPatient = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        }

        const validatedField = loginValidationZodSchema.safeParse(loginData);
        if (!validatedField.success) {
            return {
                success: false,
                errors: validatedField.error.issues.map((issue) => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    }
                }),
            }
        }

        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        })

        const result = await res.json()

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Login failed",
                errors: result.errors || []
            }
        }

        if (result.success) {
            const cookieStore = await cookies();

            // Try to get tokens from the response body if headers are not set (local dev issues sometimes)
            const accessToken = result.data?.accessToken;
            const refreshToken = result.data?.refreshToken;

            if (accessToken) {
                cookieStore.set("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 7 * 24 * 60 * 60 // 7 days
                });
            }

            if (refreshToken) {
                cookieStore.set("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 30 * 24 * 60 * 60 // 30 days
                });
            }

            return {
                success: true,
                message: result.message,
                data: result.data
            }
        }

        return {
            success: false,
            message: result.message || "Something went wrong"
        }

    } catch (error: any) {
        console.error(error, "Login Failed");
        return {
            success: false,
            message: error.message || "Internal server error"
        }
    }
}
