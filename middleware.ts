import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
// import { useQuery } from "convex/react";
// import { api } from "./convex/_generated/api";

const isAuthRoute = createRouteMatcher(["/register", "/login"]);
const isProtectedRoute = createRouteMatcher(["/new-story"]);
const isAdminRoute = createRouteMatcher(["/admin/dashboard"]);

// const me = useQuery(api.auth.getMe);
// const isAdmin = me?.role === "admin";

export default convexAuthNextjsMiddleware(async (req, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();

  if (isAuthRoute(req) && isAuthenticated) {
    return nextjsMiddlewareRedirect(req, "/");
  }

  if (isProtectedRoute(req) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(req, "/register");
  }

  // if (isAdminRoute(req) && isAuthenticated && isAdmin) {
  //   return nextjsMiddlewareRedirect(req, "/admin/dashboard");
  // }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
