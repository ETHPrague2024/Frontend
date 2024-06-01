import ethers from "ethers";

export function normalizeNumber(amount: number) {
    return ethers.utils.formatUnits(amount.toString(), 18);
}
