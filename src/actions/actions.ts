"use server"

import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import {revalidatePath} from "next/cache";
import {urlFormSchema, urlIdSchema} from "@/lib/validations";
import {checkAuthentication, getUserData} from "@/lib/server-utils";

export const addUrl = async (urlData: unknown) => {
    await checkAuthentication();

    // check authentication and get user data
    const user = await getUserData();

    if (!user) {
        return {
            message: "User not found",
        };
    }

    const validatedUrl = urlFormSchema.safeParse(urlData);

    if (!validatedUrl.success) {
        return {
            message: "Invalid URL data",
        };
    }

    // Generate short URL using nanoid
    const nanoCode = nanoid(8); // generates a random 8-character string

    try {
        // Save to a database
        await prisma.url.create({
            data: {
                ...validatedUrl.data,
                nanoCode,
                userId: user.id,
            },
        });
        revalidatePath("/");
    } catch (error) {
        console.error("Error adding URL:", error);

        return {
            message: "Failed to add URL",
        };
    }
}

export const deleteUrl = async (urlId: unknown) => {
    await checkAuthentication();

    // check authentication and get user data
    const user = await getUserData();

    if (!user) {
        return {
            message: "User not found",
        };
    }

    const validatedUrlId = urlIdSchema.safeParse(urlId);

    if (!validatedUrlId.success) {
        return {
            message: "Invalid URL data",
        };
    }

    try {
        // Delete to a database
        await prisma.url.delete({
            where: {
                userId: user.id,
                id: validatedUrlId.data
            }
        });
        revalidatePath("/");
    } catch (error) {
        console.error("Error adding URL:", error);

        return {
            message: "Failed to add URL",
        };
    }
}