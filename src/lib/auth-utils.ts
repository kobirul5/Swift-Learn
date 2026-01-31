export type UserRole = "admin" | "student";

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings"],
    patterns: [/^\/courses\/details/],
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*
    exact: [],
}

export const studentProtectedRoutes: RouteConfig = {
    patterns: [/^\/student/, /^\/dashboard/], // Routes starting with /student/* or /dashboard/*
    exact: ["/student-profile"],
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "admin" | "student" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "admin";
    }
    if (isRouteMatches(pathname, studentProtectedRoutes)) {
        return "student";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "admin") {
        return "/admin/dashboard";
    }
    if (role === "student") {
        return "/student-profile";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}
