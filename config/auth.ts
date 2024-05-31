import { AuthenticationStatus } from "@rainbow-me/rainbowkit";

export const authenticationStatus: Record<AuthenticationStatus, AuthenticationStatus> = {
  loading: "loading",
  unauthenticated: "unauthenticated",
  authenticated: "authenticated",
};

export const statement = "ETH Prague 2024 Website Authentication";
export const version = "1";
