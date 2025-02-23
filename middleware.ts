import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isAuthRoute = createRouteMatcher(["/register", "/login"]);
const isProtectedRoute = createRouteMatcher(["/user(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

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
