import Header from "@/components/Layout/Header";
import { Modal } from "@/components/modal/modalManager/ModalManager";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hidePaths = ["/login", "/signup", "/404"];

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linkhere.vercel.app" />
        <meta property="og:title" content="Linkbrary" />
        <meta
          property="og:description"
          content="나만의 링크를 관리하는 Linkbrary"
        />
        <meta
          property="og:image"
          content="https://linkhere.vercel.app/images/thumbnail_2x.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Linkbrary</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="google-site-verification"
          content="kbuZVSkHeP_7taf8zmoRwmFRSvQHsq3Pyt4c7XrxCk8"
        />
      </Head>

      <script
        defer
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
      ></script>

      <div className="min-h-screen">
        <Toaster />
        <Modal />
        {!hidePaths.includes(router.pathname) && <Header />}
        <Component {...pageProps} />
      </div>
    </>
  );
}
