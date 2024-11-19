import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const hidePaths = ["/login", "/signup", "/404"];

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linkbrary-9-99.vercel.app" />
        <meta property="og:title" content="Linkbrary" />
        <meta
          property="og:description"
          content="나만의 링크를 관리하는 Linkbrary"
        />
        <meta property="og:image" content="/images/home_main.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Linkbrary</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <script
        defer
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
      ></script>

      <div className="min-h-screen flex flex-col">
        <div>
          <Toaster />
        </div>
        {!hidePaths.includes(router.pathname) && <Header />}
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        {!hidePaths.includes(router.pathname) && <Footer />}
      </div>
    </QueryClientProvider>
  );
}
