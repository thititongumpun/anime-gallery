import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>Otaku Gallery</title>
          <meta name="description" content="Otaku Gallery" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
      <Script
        defer
        src="https://upload-widget.cloudinary.com/global/all.js"
        type="text/javascript"
      />
    </>
  );
};

export default api.withTRPC(MyApp);
