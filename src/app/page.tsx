import UrlForm from "@/components/url-form";
import UrlList from "@/components/url-list";
import {prisma} from "@/lib/prisma";
import {getUserData} from "@/lib/server-utils";
import {Url} from "@/generated/prisma";

export default async function Home() {
    const user = await getUserData();

    let urls: Url[] = [];

    if (user) {
        urls = await prisma.url.findMany({
            where: {
                userId: user.id
            },
            take: 5,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    return (
        <section className="w-full bg-gray-50 py-6 md:py-12 px-2 md:px-4">
            <div className="max-w-xl mx-auto relative py-2 md:py-6">
                <div className="text-center">
                    <h1 className="text-5xl font-medium leading-[1.30] mb-4">
                        Tiny links.<br />
                        Huge impact.
                    </h1>
                    <p className="text-2xl text-neutral-500">Shorten, customize, and manage your URLs effortlessly all in one place.</p>
                </div>
                <UrlForm/>
                <UrlList urls={urls}/>
            </div>
        </section>
    )
}