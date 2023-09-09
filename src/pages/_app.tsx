import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import "@algolia/autocomplete-theme-classic";
import "@smastrom/react-rating/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="System" enableSystem>
          {getLayout(
            <>
              <Head>
                <title>Gallery</title>
                <meta name="description" content="Anime Gallery" />
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <Script
                strategy="worker"
                src={`https://www.googletagmanager.com/gtag/js?id=${
                  gaMeasurementId as string
                }`}
              />
              <Script
                id="google-analytics"
                type="text/partytown"
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
      
                gtag('config', '${gaMeasurementId as string}');
                `,
                }}
              />
              <Script
                async
                onError={(e) => {
                  console.error("Script failed to load", e);
                }}
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID as string}`}
                strategy="lazyOnload"
                crossOrigin="anonymous"
              />
              <Script
                id="Adsense-id"
                type="text/partytown"
                dangerouslySetInnerHTML={{
                  __html: `
                    (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "ca-pub-4998059744687395",
                    enable_page_level_ads: true
                    });
                  `,
                }}
              />
              <main className={`${inter.variable} font-sans`}>
                <Component {...pageProps} />
              </main>
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster position="bottom-right" />
            </>
          )}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
