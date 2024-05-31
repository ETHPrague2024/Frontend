// @see https://www.rainbowkit.com/docs/custom-connect-button
import { Button, Image } from "@chakra-ui/react";
import { ConnectButton as ConnectButtonRK } from "@rainbow-me/rainbowkit";

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
                                    <Button variant="outline" size="sm" onClick={openConnectModal}>
                                        Connect
                                    </Button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button variant="outline" size="sm" onClick={openChainModal}>
                                        Wrong network
                                    </Button>
                                );
                            }
                            return (
                                <div style={{ display: "flex", gap: 12 }}>
                                    <Button variant="ghost" size="sm" onClick={openAccountModal}>
                                        <Image alt="ENS Avatar" width="28px" height="28px" src={account.ensAvatar as string} borderRadius="full" mr={2}></Image>
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
