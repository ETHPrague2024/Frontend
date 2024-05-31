//https://www.rainbowkit.com/docs/custom-connect-button
import { Button } from "@chakra-ui/react";
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
