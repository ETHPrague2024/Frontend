import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/config/chains";
import { fonts } from "@/config/fonts";
import { Navbar } from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <RainbowKitProvider>
                    <ChakraProvider>
                        <main className={fonts.rubik.className}>
                            <Navbar />
                            <Component {...pageProps} />
                        </main>
                    </ChakraProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default MyApp;
