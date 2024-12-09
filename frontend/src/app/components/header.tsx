import LogInPage from "../auth/log-in/page"
import SignUpPage from "../auth/sign-up/page"
import { auth } from "../../../lib/auth"
import Link from "next/link"
import LogOutButton from "./log-out-button"

export const Header = async()=> {

    const user= await auth.getUser()
    return (
        <header>
        <SignUpPage />
            <h2>------------------------</h2>
            {user ? (
                <>
                <Link href={'/create'}>
                    Create
                </Link>
                <LogOutButton />
                </>
            ) : (<LogInPage />)}
        </header>
    )
}