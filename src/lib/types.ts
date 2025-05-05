import {Url} from "@/generated/prisma";

export type UrlEssentials = Omit<
    Url,
    "id" | "createdAt"
>;

export type OriginalUrl = Omit<
    Url,
    "id" | "userId" | "nanoCode" | "clicks" | "createdAt"
>;