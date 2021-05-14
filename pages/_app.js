import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/shared/header";

import { Router } from "next/router";
import { useCurrentPathIs } from "../hooks/router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { Modal } from "../components/shared/modals";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const authPages = ["/auth/login", "/auth/register"];

  const isAuthPage = useCurrentPathIs(authPages);

  return (
    <Provider store={store}>
      <div>
        <Head>
          <title>BruListing</title>
        </Head>
        {!isAuthPage && <Header />}
        <div
          className={
            isAuthPage
              ? "h-screen bg-white flex flex-col flex-grow-0"
              : undefined
          }
        >
          <div className="bg-white font-sans flex-grow">
            <Component {...pageProps} />
            <Modal />
          </div>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
