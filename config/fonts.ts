import { Rubik } from "next/font/google";
import { VT323 } from "next/font/google";
import { Press_Start_2P } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const fonts = {
  rubik,
  vt323,
  pressStart2P,
};