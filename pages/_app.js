import { Provider as NextAuthProvider } from "next-auth/client";
import Head from "next/head";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import Footer from "../components/footer";
import CheckSession from "../components/shared/check-session";
import Header from "../components/shared/header";
import { Modal } from "../components/shared/modals";
import Notification from "../components/shared/notification";
import { useCurrentPathIs } from "../hooks/router";
import { store } from "../lib/store";
import { DefaultSeo } from "next-seo";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const authPages = ["/auth/login", "/auth/register"];

  const isAuthPage = useCurrentPathIs(authPages);

  return (
    <Provider store={store}>
      <NextAuthProvider session={pageProps.session}>
        <CheckSession />
        <DefaultSeo
          titleTemplate="BruListing | %s"
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://brulisting.syahnurnizam.com/",
            site_name: "BruListing",
          }}
          twitter={{
            cardType: "summary_large_image",
          }}
        />
        <div>
          <Head>
            <title>BruListing</title>
          </Head>
          {!isAuthPage && <Header />}
          <div className={isAuthPage ? "h-screen bg-white flex flex-col flex-grow-0" : undefined}>
            <div className="bg-white font-sans flex-grow">
              <Component {...pageProps} />
              <Modal />
            </div>
            <Footer />
          </div>
        </div>
        <Notification />
      </NextAuthProvider>
    </Provider>
  );
}

export default MyApp;
