import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import localFont from "next/font/local";

const cabinetGrotesk = localFont({
  src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet-grotesk",
  weight: "100 900", // Variable font supports all weights
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Living Works - Creative × Connection × Capital</title>
        <meta name="description" content="LivingWorks. Where Capability and Courage meets Capital. Where Mastery meets Means. Where the Bold meets true Believers." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className={cabinetGrotesk.variable + " antialiased"}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
