import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { AuthenticationStatus, RainbowKitAuthenticationProvider, createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { Address, zeroAddress } from "viem";
import { SiweMessage } from "siwe";
import { useAccount } from "wagmi";
import { jwtDecode } from "jwt-decode";
import { getAuthCookie, removeAuthCookie, setAuthCookie } from "@/lib/cookie";
import { authenticationStatus, statement, version } from "@/config/auth";
import { API_URL } from "@/config/urls";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const toast = useToast();
    const { address } = useAccount();
    const [authStatus, setAuthStatus] = useState<AuthenticationStatus>(authenticationStatus.loading);

    useEffect(() => {
        if (authStatus !== authenticationStatus.authenticated) {
            const jwt = getAuthCookie(address || zeroAddress);
            if (!!jwt) {
                setAuthStatus(authenticationStatus.authenticated);
            } else {
                setAuthStatus(authenticationStatus.unauthenticated);
            }
        }
    }, [address, authStatus]);

    const authenticationAdapter = createAuthenticationAdapter({
        getNonce: async () => {
            const response = await fetch(`${API_URL}/api/auth/nonce`);
            const json = await response.json();
            return json.data.nonce;
        },
        createMessage: ({ nonce, address, chainId }) => {
            return new SiweMessage({
                domain: window.location.host,
                address,
                statement,
                uri: window.location.origin,
                version,
                chainId,
                nonce,
            });
        },
        getMessageBody: ({ message }) => {
            return message.prepareMessage();
        },
        verify: async ({ message, signature }) => {
            try {
                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message, signature }),
                });
                const json = await response.json();
                const isSuccess = json.success && json?.data?.success && json.data.jwt;

                if (isSuccess) {
                    const { jwt } = json.data;
                    const { exp } = jwtDecode(jwt);

                    setAuthCookie(message.address as Address, jwt, {
                        expires: exp ? new Date(exp * 1000) : undefined,
                    });
                    setAuthStatus(authenticationStatus.authenticated);
                    toast({
                        position: "top-right",
                        isClosable: true,
                        status: "success",
                        title: "Signed in",
                        description: "You are connected",
                    });
                } else {
                    setAuthStatus(authenticationStatus.unauthenticated);
                    toast({
                        position: "top-right",
                        isClosable: true,
                        status: "error",
                        title: "Error",
                        description: "Sign in failed, try again.",
                    });
                }

                return Boolean(isSuccess);
            } catch (error) {
                toast({
                    position: "top-right",
                    isClosable: true,
                    status: "error",
                    title: "Error",
                    description: error as string,
                });
                return false;
            }
        },
        signOut: async () => {
            if (!!address) {
                removeAuthCookie(address);
                await fetch(`${API_URL}/api/auth/logout`);
                setAuthStatus(authenticationStatus.unauthenticated);
            }
        },
    });

    return (
        <RainbowKitAuthenticationProvider adapter={authenticationAdapter} status={authStatus}>
            {children}
        </RainbowKitAuthenticationProvider>
    );
};
