import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}