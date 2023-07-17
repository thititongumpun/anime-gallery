import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import "@algolia/autocomplete-theme-classic";
import "swiper/css/bundle";
import "@smastrom/react-rating/style.css";
import Head from "next/head";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { GoogleAnalytics } from "nextjs-google-analytics";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
                <meta name="description" content="Otaku Gallery" />
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <GoogleAnalytics
                trackPageViews
                gaMeasurementId={gaMeasurementId}
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
