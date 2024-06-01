import { ethers } from "ethers";
import { infuraProvider } from "@/utilities/provider";

export async function getDateFromBlockNumber(blockNumber: number) {
    const provider = infuraProvider;
    try {
        const block = await provider.getBlock(blockNumber);

        if (block) {
            const date = new Date(block.timestamp * 1000);
            return date;
        } else {
            return "Block not found";
        }
    } catch (error) {
        console.error("Error fetching block:", error);
        return null;
    }
}
