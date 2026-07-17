import Navbar from "./Navbar";
import Footer from "./Footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}