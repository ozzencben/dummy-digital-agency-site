import { MotionConfig } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import "./AppRoute.css";

import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

import About from "../../pages/about/About";
import Contact from "../../pages/contact/Contact";
import Home from "../../pages/home/Home";
import Services from "../../pages/services/Services";
import Test from "../../pages/test/Test";

const AppRoute = () => {
  return (
    <MotionConfig>
      <div className="app-container">
        <div className="navbar">
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
        </Routes>

        <Footer />
      </div>
    </MotionConfig>
  );
};

export default AppRoute;
