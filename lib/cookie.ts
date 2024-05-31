import Cookies from "js-cookie";
import { Address } from "viem";

const JWT_COOKIE = "ethprague2024_";

export const getAuthCookie = (address: Address) => Cookies.get(`${JWT_COOKIE}_${address}`);

export const setAuthCookie = (address: Address, data: string, options?: Cookies.CookieAttributes) =>
  Cookies.set(`${JWT_COOKIE}_${address}`, data, {
    sameSite: "strict",
    secure: true,
    expires: 7, // 7 days, can be overridden
    ...options,
  });

export const removeAuthCookie = (address: Address) => {
  Cookies.remove(`${JWT_COOKIE}_${address}`);
};
