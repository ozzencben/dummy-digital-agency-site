// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import "./OurServices.css";

const OurServices = ({ t }) => {
  const ourServicesContent = t("services");

  return (
    <div className="our-services-container">
      <MobileScreen t={t} ourServicesContent={ourServicesContent} />
    </div>
  );
};

const MobileScreen = ({ ourServicesContent }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="mobile-screen-container">
      {Object.entries(ourServicesContent).map(([key, value], index) => {
        console.log("INDEX:", index, "GIF:", value.gif);
        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            key={key}
            className={`mobile-service-card ${
              activeIndex === index ? "active" : "inactive"
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="mobile-card-header">
              <h1
                className={`mobile-service-title ${
                  activeIndex === index ? "active" : "inactive"
                }`}
              >
                {value.title}
              </h1>
              <GoChevronDown
                className={`mobile-service-icon ${
                  activeIndex === index ? "active" : "inactive"
                }`}
              />
            </div>

            <div className="mobile-card-content">
              {activeIndex === index && (
                <ul
                  className={`mobile-service-list ${
                    activeIndex === index ? "active" : "inactive"
                  }`}
                >
                  {value.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}

              {!isMobile && activeIndex === index && (
                <img src={value.gif} alt="GIF" className="mobile-service-gif" />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OurServices;
