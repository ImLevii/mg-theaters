import { Poppins as FontPoppins, Saira as FontSaira, Orbitron as FontOrbitron } from "next/font/google";

export const Poppins = FontPoppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const Saira = FontSaira({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-saira",
  display: "swap",
});

export const Orbitron = FontOrbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});
