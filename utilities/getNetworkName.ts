import { infuraProvider } from "@/utilities/provider";

export const getNetworkName = async (chainId: string) => {
    const provider = infuraProvider;
    const network = await provider.getNetwork();
    const chainIdNumber = parseInt(chainId);
    if (network.chainId === chainIdNumber) {
        return network.name;
    }
    return null;
};
