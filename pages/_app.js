import Head from "next/head";
import "tailwindcss/tailwind.css";
import Footer from "../components/footer";
import Header from "../components/shared/header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BruListing</title>
      </Head>
      <Header />
      <div className="bg-white font-sans">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
