'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import { ReactNode } from "react"

interface CardWrapperType{
    title: string
    label : string
    children : ReactNode
    href : string
    hrefLabel : string
}
export function CardWrapper({title, label , children , href , hrefLabel} : CardWrapperType){
    return <Card className="shadow-md lg:w-1/2 py-10 lg:px-5">
        <CardHeader className="items-center">
            <span className="text-3xl">{title}</span>
            <span>{label}</span>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
            <Link href={href} className="flex justify-center w-full hover:underline">
                {hrefLabel}
            </Link>
            <Button className="w-full" onClick={()=> signIn('google')}>Continue with Google <FcGoogle/></Button>
        </CardFooter>
    </Card>
}