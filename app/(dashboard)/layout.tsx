import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen">
            <div className="md:fixed left-0 top-0 h-full  shadow-lg">
                <Sidebar />
            </div>
            <div className="md:flex-1 md:pl-72 w-full">
                <Navbar />
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
