import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    try {
        // Step 1: Extract the slug from params (which is now a Promise in Next.js 15)
        const { slug } = await params;

        // Step 2: Validate the slug format (optional but recommended)
        if (!slug || slug.length < 3) {
            notFound();
        }

        // Step 3: Look up the URL in the database
        const url = await prisma.url.findUnique({
            where: { nanoCode: slug },
            // select: { id: true, originalUrl: true, expiresAt: true }
        });

        // Step 4: Handle URL not found
        if (!url) {
            return notFound();
        }

        // Step 5: Increment visit count (fire and forget - no await)
        // We don't block the redirect on this database operation
        incrementVisitCount(url.id).catch(error =>
            console.error(`Failed to increment visit count for ${slug}:`, error)
        );

        // Step 6: Redirect to the original URL
        // This will throw a NEXT_REDIRECT error that should NOT be caught here
        redirect(url.originalUrl);
    } catch (error) {
        // Only catch a database or other operational errors, not the redirect
        if (!(error instanceof Error && error.message.includes('NEXT_REDIRECT'))) {
            // Log the error with enough context for debugging
            console.error(`Error processing short URL:`, error);

            // Return a proper error page rather than throwing
            return notFound();
        }
        throw error; // Re-throw NEXT_REDIRECT errors to let Next.js handle them
    }
}

/**
 * Increments the visit count for a URL
 * Extracted to a separate function for cleaner code
 */
async function incrementVisitCount(urlId: string): Promise<void> {
    try {
        await prisma.url.update({
            where: { id: urlId },
            data: {
                clicks: { increment: 1 },
                // lastVisitedAt: new Date()
            },
        });
    } catch (error) {
        console.error(`Failed to increment visit count for URL ${urlId}:`, error);
    }

    // This could be expanded to log more detailed analytics if needed
}

export const metadata: Metadata = {
    title: "Shooorty - Redirecting...",
    description: "Redirecting to your destination",
};