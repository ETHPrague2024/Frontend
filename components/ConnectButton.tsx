// @see https://www.rainbowkit.com/docs/custom-connect-button
import { Button, Box, Avatar } from "@chakra-ui/react";
import { ConnectButton as ConnectButtonRK } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const ConnectButton = () => {
    return (
        <ConnectButtonRK.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");
                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        colorScheme="teal"
                                        variant="outline"
                                        size="md"
                                        sx={{
                                            ":hover": {
                                                bg: "brand.900",
                                                color: "teal.300",
                                            },
                                        }}
                                        onClick={openConnectModal}
                                    >
                                        Connect
                                    </Button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button
                                        colorScheme="teal"
                                        variant="outline"
                                        size="md"
                                        sx={{
                                            ":hover": {
                                                bg: "brand.900",
                                                color: "teal.300",
                                            },
                                        }}
                                        onClick={openChainModal}
                                    >
                                        Wrong network
                                    </Button>
                                );
                            }
                            return (
                                <div style={{ display: "flex", gap: 12 }}>
                                    <Button
                                        colorScheme="teal"
                                        variant="outline"
                                        size="md"
                                        sx={{
                                            ":hover": {
                                                bg: "brand.900",
                                                color: "teal.300",
                                            },
                                        }}
                                        onClick={openAccountModal}
                                    >
                                        <Box borderRadius="full" mr={2} overflow="hidden">
                                            {account.ensAvatar ? <Image alt="ENS Avatar" width={28} height={28} src={account.ensAvatar} /> : <Avatar name={account.displayName} size="xs" />}
                                        </Box>
                                        {account.displayName}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButtonRK.Custom>
    );
};
