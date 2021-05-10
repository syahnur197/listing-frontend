import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import Footer from "../components/footer";
import Header from "../components/shared/header";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const currentPathName = router.pathname;

  const authPages = ["/auth/login", "/auth/register"];

  const isAuthPage = authPages.includes(currentPathName);

  return (
    <div>
      <Head>
        <title>BruListing</title>
      </Head>
      {!isAuthPage && <Header />}
      <div
        className={isAuthPage && "h-screen bg-white flex flex-col flex-grow-0"}
      >
        <div className="bg-white font-sans flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
