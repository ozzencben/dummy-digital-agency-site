import { useContext } from "react";
import LanguageContext from "../../context/language/LanguageContext";
import CTA from "./cta/CTA";
import FAQ from "./faq/FAQ";
import Focus from "./focus/Focus";
import ServicesHero from "./hero/ServicesHero";
import OurServices from "./our-services/OurServices";
import Packages from "./packages/Packages";
import "./Services.css";

const Services = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="services-container">
      <ServicesHero t={t} />
      <Focus t={t} />
      <OurServices t={t} />
      <div className="space"></div>
      <div className="space"></div>
      <div className="space"></div>
      <Packages t={t} />
      <CTA t={t} />
      <FAQ t={t} />
    </div>
  );
};

export default Services;
