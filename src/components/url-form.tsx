"use client"

import {addUrl} from "@/actions/actions";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TUrlForm, urlFormSchema} from "@/lib/validations";
import {toast} from "sonner";
import {OriginalUrl} from "@/lib/types";
import {Button} from "@/components/ui/button";
import {Link} from "lucide-react";

export default function UrlForm() {
    const {register, trigger, getValues, formState: {errors}} = useForm<TUrlForm>({
        resolver: zodResolver(urlFormSchema)
    })

    const handleAddUrl = async (urlData: OriginalUrl) => {
        const error = await addUrl(urlData);

        if (error) {
            toast.warning(error.message);
            return;
        }
    }

    return (
        <form action={async () => {
            const result = await trigger();

            if (!result) return;

            const urlData = getValues();

            await handleAddUrl(urlData)
        }} className="mt-8 space-y-6">
            <div
                className="relative flex flex-row items-center overflow-hidden rounded-xl border border-neutral-200 bg-white px-4 drop-shadow-md transition-all focus-within:ring focus-within:border-primary focus-within:ring-primary/20">
                <label className="flex w-full items-center"><span
                    className="sr-only">Destination URL</span>
                    <Link/>
                    <Input id="originalUrl" placeholder="Shorten any link..."
                           className="w-full rounded-r-xl border-0 outline-0 shadow-none focus-visible:ring-0 py-8 px-4 md:text-lg outline-none"
                           {...register("originalUrl")} />
                </label>
                <div className="flex w-full shrink-0 items-center justify-center pt-1 sm:w-auto sm:pl-1 sm:pt-0">
                    <Button type="submit" className="cursor-pointer"
                    >Shorten
                        link
                    </Button>
                </div>
            </div>
            {errors.originalUrl && <p className="text-red-500 text-lg text-center">{errors.originalUrl.message}</p>}
        </form>
    )
}
