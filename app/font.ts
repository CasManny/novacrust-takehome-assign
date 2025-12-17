import localFont from "next/font/local";
export const clashDisplay = localFont({
  src: [
    {
      path: "./fonts/clash-display/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/clash-display/ClashDisplay-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/clash-display/ClashDisplay-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/clash-display/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});
