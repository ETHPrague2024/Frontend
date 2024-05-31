import { getDefaultConfig } from "@rainbow-me/rainbowkit";
//TODO: Add chains to config
import { mainnet, optimism, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "ETH Prague Hackathon 2024",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  chains: [mainnet, optimism, sepolia],
  ssr: true,
});
