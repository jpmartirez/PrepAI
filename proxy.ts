import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ALl public routes
const isPublicRoute = createRouteMatcher(["/", "/pricing", "/tracks(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	// If not public, protect it
	if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
