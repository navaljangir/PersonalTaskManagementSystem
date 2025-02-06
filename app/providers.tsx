'use client'

import { ReactNode } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { SessionProvider } from "next-auth/react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()
export function Providers({ children }: { children: ReactNode }) {
    return <SessionProvider>
        <QueryClientProvider client={queryClient}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </QueryClientProvider>
    </SessionProvider>
}