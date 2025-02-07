'use client'

import Link from "next/link"
import { AuthBar } from "../ui/AppbarAuth"

const navbarContent = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Features',
        href: '/pricing'
    },
    {
        name: 'About us',
        href: '/aboutus'
    }
]

export default function NavbarLandingPage() {
    return <div className="w-full">
        <div className="fixed w-full flex justify-center items-center">
            <div className="flex px-10 justify-between shadow-md border-2 rounded-full  max-w-[1000px] w-full py-4 md:px-40">
                <div className="flex gap-2 text-sm md:text-lg md:gap-6 justify-center items-center">
                    {navbarContent.map((val, index) => (
                        <Link key={index} href={val.href} className="hover:underline">
                            {val.name}
                        </Link>
                    ))}
                </div>
                <AuthBar/>
            </div>

        </div>
    </div>
}