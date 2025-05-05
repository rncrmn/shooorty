import "server-only";

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";

export async function checkAuthentication() {
    const {isAuthenticated} = getKindeServerSession();

    // Check if the user is authenticated
    if (!(await isAuthenticated())) {
        redirect("/api/auth/login");
    }
}

export async function getUserData() {
    const {getUser} = getKindeServerSession();
    // Get user data
    return await getUser();
}

export async function checkAuthenticationAndGetUser() {
    // check authentication
    await checkAuthentication();

    // get user data
    return await getUserData();
}