import { Html, Head, Main, NextScript } from "next/document";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-[#121212] text-[#7d57d0]">
        <Main />
        <NextScript />
        <SpeedInsights />
      </body>
    </Html>
  );
}
