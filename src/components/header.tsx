import Logo from "@/components/logo";
import {Button} from "@/components/ui/button";
import {LoginLink, LogoutLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {KindeUser} from "@kinde-oss/kinde-auth-nextjs";

type HeaderProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: KindeUser<Record<string, any>> | null;
}

export default function Header({user}: HeaderProps) {
    return (
        <header className="py-1 md:py-2 w-full relative">
            <div className="py-1 md:py-2 px-2 md:px-0 max-w-5xl mx-auto w-full">
                <div className="grid grid-cols-2 gap-4">
                    <Logo/>
                    <div className="flex items-center gap-3 justify-end">
                        {!user ? (
                            <>
                                <Button variant="outline" asChild>
                                    <LoginLink>Sign in</LoginLink>
                                </Button>
                                <Button asChild>
                                    <RegisterLink>Sign up</RegisterLink>
                                </Button>
                            </>
                        ) : (
                            <Button asChild>
                                <LogoutLink>Logout</LogoutLink>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
