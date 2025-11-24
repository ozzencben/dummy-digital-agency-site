import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import "./Packages.css";

const Packages = ({ t }) => {
  const servicePackages = t("servicePackages");
  const packagesArray = Object.entries(servicePackages);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Yatay scroll ayarı
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="packages-section">
      <div className="packages-sticky-wrapper">
        <motion.div
          className="packages-header"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        >
          <h2 className="packages-main-title">{t("packagesTitle")}</h2>
        </motion.div>

        <div className="packages-overflow-hidden">
          <motion.div style={{ x }} className="packages-track">
            {/* Intro Card */}
            <div className="package-card intro-card">
              <div className="intro-text">
                <span>{t("choose")}</span>
                <span>{t("your")}</span>
                <span className="hollow-text">{t("level")}</span>
              </div>
            </div>

            {/* Paket Kartları */}
            {packagesArray.map(([key, value], index) => (
              <PackageCard key={key} data={value} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PackageCard = ({ data, index }) => {
  // İlk açılışta ilk menü açık gelsin
  const [openSubPackage, setOpenSubPackage] = useState(
    Object.keys(data.packages)[0]
  );

  const toggleSubPackage = (subKey) => {
    // Tıklanan zaten açıksa hiçbir şey yapma (Kart boş kalmasın)
    if (openSubPackage !== subKey) {
      setOpenSubPackage(subKey);
    }
  };

  return (
    <div className="package-card">
      <div className="card-top">
        <span className="card-index">0{index + 1}</span>
        <h3 className="card-title">{data.title}</h3>
      </div>

      <div className="card-body">
        {Object.entries(data.packages).map(([subKey, subValue]) => {
          const isOpen = openSubPackage === subKey;

          return (
            <div
              key={subKey}
              className={`accordion-item ${isOpen ? "active" : "inactive"}`}
              onClick={() => toggleSubPackage(subKey)}
            >
              {/* Başlık Alanı */}
              <div className="accordion-header">
                <h4 className="accordion-title">{subValue.title}</h4>
                <span className={`accordion-icon ${isOpen ? "rotated" : ""}`}>
                  <GoPlus />
                </span>
              </div>

              {/* Modal İçerik Alanı */}
              <div className="accordion-content-wrapper">
                <div className="accordion-content-inner">
                  <ul className="sub-package-list">
                    {Object.entries(subValue.items).map(
                      ([itemKey, itemValue]) => (
                        <li key={itemKey}>{itemValue}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card-decoration"></div>
    </div>
  );
};

export default Packages;
