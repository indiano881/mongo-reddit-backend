"use client"

import { QueryClient, QueryClientProvider as OriginalQueryClientProvider} from "@tanstack/react-query";
import { ReactNode } from "react";
//it is a provider so to wrap we need to put children

const makeQueryClient= () => {
    return new QueryClient();
}

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
    //we are in the server-we must create a new client every time
    if (typeof window === "undefined") {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient= makeQueryClient();
        return browserQueryClient
    }
}

export const QueryClientProvider= ({children}:{children: ReactNode}) => {
    const queryClient= getQueryClient()

    return (
        <OriginalQueryClientProvider client={queryClient}>
            {children}
        </OriginalQueryClientProvider>
    )
}
