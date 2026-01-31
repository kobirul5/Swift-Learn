import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils';

export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const pathname = request.nextUrl.pathname;

    const accessToken = request.cookies.get("accessToken")?.value || null;

    let userRole: UserRole | null = null;
    if (accessToken) {
        const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

        if (typeof verifiedToken === "string") {
            cookieStore.delete("accessToken");
            cookieStore.delete("refreshToken");
            return NextResponse.redirect(new URL('/login', request.url));
        }

        userRole = verifiedToken.role;
    }

    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname)

    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }

    if (routerOwner === null) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (routerOwner === "COMMON") {
        return NextResponse.next();
    }

    if (routerOwner === "admin" || routerOwner === "student") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}
