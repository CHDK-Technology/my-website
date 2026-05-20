import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

/* MAIN PAGES */
import Home from "./pages/Home";
import BusinessOverview from "./pages/business";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Gallery from "./pages/Gallery";
import Apply from "./pages/Apply";

/* BUSINESS */
import Agriculture from "./pages/business/Agriculture";
import Aerospace from "./pages/business/Aerospace";
import Infrastructure from "./pages/business/Infrastructure";
import RenewableEnergy from "./pages/business/Renewable";
import WasteManagement from "./pages/business/WasteManagement";
import IndustrialServices from "./pages/business/IndustrialServices";
import ITSolutions from "./pages/business/ITSolutions";

/* ABOUT */
import Overview from "./pages/about/Overview";
import Innovation from "./pages/about/Innovation";
import AdvisoryBoard from "./pages/about/advisory-board";

/* SOLUTIONS */
import SolutionsOverview from "./pages/solutions/overview";
import WebDev from "./pages/solutions/WebDev";
import DigitalMarketing from "./pages/solutions/DigitalMarketing";
import SEO from "./pages/solutions/SEO";
import AppDev from "./pages/solutions/AppDev";
import ThreeDScanning from "./pages/solutions/3d-scanning";
import CalibrationPage from "./pages/solutions/calibration";
import AdvancedMetrology from "./pages/solutions/advanced-metrology";

/* EXTRA SOLUTIONS */
import ReverseEngineering from "./pages/solutions/reverse-engineering";
import JigMouldAerospaceTooling from "./pages/solutions/jig-mould-aerospace-tooling";
import PrecisionManufacturing from "./pages/solutions/precision-manufacturing";


import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import Accessibility from "./pages/legal/Accessibility";
import Disclaimer from "./pages/legal/Disclaimer";
import SecurityPolicy from "./pages/legal/SecurityPolicy";
import TermsConditions from "./pages/legal/TermsConditions";
import ScrollToTop from "./components/ScrollToTop";




function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <Layout>
        <Routes>

          {/* MAIN */}
          <Route path="/" element={<Home />} />
          <Route path="/business-overview" element={<BusinessOverview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/careers/Apply" element={<Apply />} />

          {/* BUSINESS */}
          <Route path="/business/agriculture" element={<Agriculture />} />
          <Route path="/business/aerospace" element={<Aerospace />} />
          <Route path="/business/infrastructure" element={<Infrastructure />} />
          <Route path="/business/renewable-energy" element={<RenewableEnergy />} />
          <Route path="/business/waste-management" element={<WasteManagement />} />
          <Route path="/business/industrial-services" element={<IndustrialServices />} />
          <Route path="/business/it-solutions" element={<ITSolutions />} />

          {/* ABOUT */}
          <Route path="/about/overview" element={<Overview />} />
          <Route path="/about/innovation" element={<Innovation />} />
          <Route path="/about/advisory-board" element={<AdvisoryBoard />} />

          {/* SOLUTIONS */}
          <Route path="/solutions/overview" element={<SolutionsOverview />} />
          <Route path="/solutions/web-development" element={<WebDev />} />
          <Route path="/solutions/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/solutions/seo" element={<SEO />} />
          <Route path="/solutions/app-development" element={<AppDev />} />
          <Route path="/solutions/3d-scanning" element={<ThreeDScanning />} />
          <Route path="/solutions/calibration" element={<CalibrationPage />} />
          <Route path="/solutions/advanced-metrology" element={<AdvancedMetrology />} />

          {/* EXTRA SOLUTIONS */}
          <Route path="/solutions/reverse-engineering" element={<ReverseEngineering />} />
          <Route path="/solutions/jig-mould-aerospace-tooling" element={<JigMouldAerospaceTooling />} />
          <Route path="/solutions/precision-manufacturing" element={<PrecisionManufacturing />} />


          {/* LEGAL */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/security-policy" element={<SecurityPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div style={{ padding: "150px 20px", textAlign: "center", color: "#fff" }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for doesn't exist or is under construction.</p>
              </div>
            }
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;