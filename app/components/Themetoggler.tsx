"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggler() {
    const { setTheme } = useTheme()

    return (
        <Button variant="outline" size="icon" onClick={() => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        }}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
