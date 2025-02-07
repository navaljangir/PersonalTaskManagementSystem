'use client'

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function GetStartedButton(){
    const router = useRouter()
    const session = useSession()
    const handleOnClick = ()=>{
        if(session.data?.user.id){
            router.push('/dashboard')
        }else{
            router.push('/signin')
        }
    }
    return (
        <Button className="w-64 text-xl py-4" onClick={handleOnClick}>
            Get Started
        </Button>
    )
}