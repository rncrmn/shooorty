import UrlCard from "@/components/url-card";
import {Url} from "@/generated/prisma";

type UrlListProps = {
    urls: Url[];
}

export default function UrlList({ urls }: UrlListProps) {
    return (
        <div className="mt-6 space-y-3">
            {urls.map(url => (
                <UrlCard url={url} key={url.nanoCode} />
            ))}
        </div>
    );
}