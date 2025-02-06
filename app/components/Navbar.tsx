'use client'

import { AuthBar } from "./ui/AppbarAuth"

export default function Navbar(){
    return <div className="h-14 border-b w-full flex items-center">
        <div className="flex px-4 justify-between w-full">
            <span className="text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-clip text-transparent font-bold flex items-center">
                TaskManager
            </span>
            <AuthBar/>
        </div>
    </div>
}