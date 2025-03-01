'use client'
import {  PanelLeftOpen, PanelRightOpen } from "lucide-react"
import { useState } from "react"
import SideBaritems from "./ui/Sidebar-items"

export function Sidebar() {
    const [isSideBarOpen, setSideBarOpen] = useState(true)
    
    return <div className="h-full pt-5 border-r overflow-hidden">
        <div className="h-full hidden md:block">
        <div className="flex items-center gap-2 pb-2 border-b w-full pl-6">
            <button onClick={()=> setSideBarOpen((isSideBarOpen)=> !isSideBarOpen)}>
               {isSideBarOpen ? <PanelRightOpen size={30}/> : <PanelLeftOpen size={30}/>}
            </button>
           {isSideBarOpen && <span className="text-2xl">Menu</span>}
        </div>
        <SideBaritems isSideBarOpen={isSideBarOpen}/>
        </div>

        {/* Mobile view */}
        {
            <div className="h-10 w-full fixed bottom-0 lg:hidden border-t py-2">
                
            </div>
        }
    </div>
}