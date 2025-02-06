import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return <div className="flex h-full">
        <div className="h-full">
            <Sidebar />
        </div>
        <div className="w-full">
            <Navbar />
            {children}
        </div>
    </div>
}