'use client'

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ThemeToggler } from "../Themetoggler"

export function AuthBar(){
    const session = useSession()
    const userId = session.data?.user.id
    const router= useRouter()
    return <div className="flex items-center gap-4">
         <ThemeToggler/>
        {!userId? 
            // Logged in
            <div className="flex gap-2">
                
                <Button className="dark:bg-blue-600 font-semibold" onClick={()=>{
                    router.push('/signin')
                }}>
                    Login
                </Button>
                <Button className="font-semibold" onClick={()=>{
                    router.push('/signup')
                }}>
                    Signup
                </Button>
            </div> : <Button onClick={()=> signOut({callbackUrl : '/signin'})}>
                    Logout
                    </Button>}
    </div>
}