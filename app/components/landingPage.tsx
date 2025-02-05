'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function LandingPage(){
    return <div>
        <Button onClick={()=>{signIn('email')}}>
            hi there
        </Button>
    </div>
}