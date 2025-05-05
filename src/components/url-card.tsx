"use client"

import React, {useState} from 'react'
import Link from "next/link";
import {ArrowRight, Copy, CopyCheck, MousePointerClick, Trash2} from "lucide-react";
import Image from "next/image";
import {cleanUrl} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Url} from "@/generated/prisma";
import {deleteUrl} from "@/actions/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

type UrlCardProps = {
    url: Url;
}

export default function UrlCard({url}: UrlCardProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? window.location.origin;
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = async (nanoCode: string) => {
        const fullUrl = `${baseUrl}/${nanoCode}`;
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopiedId(nanoCode);
            // Reset the "Copied" state after 2 seconds
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDeleteUrl = async (urlId: Url["id"]) => {
        const error = await deleteUrl(urlId);

        if (error) {
            toast.warning(error.message);
            return;
        }
    }

    return (
        <div
            className="rounded-xl border border-gray-200 bg-white p-3 max-w-full shadow-none drop-shadow-sm"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-grow">
                    <div className="flex-none rounded-full border border-gray-200 bg-gradient-to-t from-gray-100 p-1">
                        <Image src="https://avatar.vercel.sh/rauchg" width={40} height={40} alt="URL icon"
                               className="rounded-full"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Link
                            href={`/${url.nanoCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium"
                            aria-label={`Open shortened URL ${url.nanoCode}`}
                        >
                            <span
                                className="truncate">{`${cleanUrl(process.env.NEXT_PUBLIC_BASE_URL!)}/${url.nanoCode}`}</span>
                        </Link>
                        <Link
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-700 hover:underline transition-all"
                            aria-label={`Open shortened URL ${url.nanoCode}`}
                        >
                            <ArrowRight size={16} className="text-gray-500"/> <span
                            className="truncate">{cleanUrl(url.originalUrl)}</span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                    <Badge className="flex items-center gap-1 text-md" variant="outline">
                        <MousePointerClick size={16}/>
                        <span>{url.clicks} clicks</span>
                    </Badge>
                    <div className="space-x-0.5">
                        <Button
                            variant="outline"
                            onClick={() => handleCopy(url.nanoCode)}
                            className="rounded-full size-8 border-none shadow-none cursor-pointer"
                        >
                            {copiedId === url.nanoCode ? (
                                <CopyCheck size={16}/>
                            ) : (
                                <Copy size={16}/>
                            )}
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="rounded-full size-8 border-none shadow-none cursor-pointer">
                                    <Trash2 size={16}/>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={async () => await handleDeleteUrl(url.id)}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
