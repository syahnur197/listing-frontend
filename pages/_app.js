import "tailwindcss/tailwind.css";
import Footer from "../components/footer";
import Header from "../components/shared/header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
