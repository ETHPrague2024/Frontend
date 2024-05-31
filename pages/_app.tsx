import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/config/chains";
import { fonts } from "@/config/fonts";
import { Navbar } from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/lib/AuthProvider";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RainbowKitProvider modalSize="compact" coolMode>
                        <ChakraProvider>
                            <Component {...pageProps} />
                        </ChakraProvider>
                    </RainbowKitProvider>
                </AuthProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
