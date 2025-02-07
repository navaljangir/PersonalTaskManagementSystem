'use client'
import { cn } from "@/lib/utils"
import { BookCheck, HomeIcon, Kanban } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sideBarContent = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: <HomeIcon />
    },
    {
        name: 'Tasks',
        link: '/tasks',
        icon: <BookCheck />
    },
    {
        name: 'Projects',
        link: '/projects',
        icon: <Kanban />
    }
]

export default function SideBaritems({isSideBarOpen} : {isSideBarOpen : boolean}) {
    const pathname = usePathname()
    return <div className="h-full lg:sticky pt-8">
        <div className="flex flex-col space-y-8 px-4">
            {sideBarContent.map(({ name, link, icon }, index) => {
                return <Link className={cn("flex bg-transparent items-center text-base justify-start p-2 gap-2 rounded-md",
                    "w-full border-none shadow-none ",
                    `${pathname === link ? 'bg-blue-200/25 text-blue-600' : "hover:bg-blue-600"}`,
                    `${isSideBarOpen && `w-64`}`
                )}
                    href={link}
                    key={index}>
                    {icon}{isSideBarOpen && name}
                </Link>
            })}
        </div>

    </div>
}