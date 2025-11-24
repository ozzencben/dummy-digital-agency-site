import { motion } from "framer-motion"; // Framer Motion eklendi
import { useContext } from "react";
import LanguageContext from "../../context/language/LanguageContext";
import "./About.css";

// Animasyon varyantları tanımlanıyor
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Çocuk elementler arasında 0.3 saniye gecikme
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const About = () => {
  const { t } = useContext(LanguageContext);

  // JSON metinlerini çekme (t fonksiyonu ile)
  const aboutData = t("about", { returnObjects: true });
  const ctaData = t("cta", { returnObjects: true });

  if (!aboutData || !aboutData.section1) {
    return <div className="about-container">Loading...</div>;
  }

  return (
    <motion.div
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ana Başlık */}
      <motion.h1 className="about-main-title" variants={itemVariants}>
        {aboutData.title}
      </motion.h1>

      {/* Bölüm 1: Misyon ve Vizyon */}
      <motion.section
        className="about-section mission-vision"
        variants={itemVariants}
      >
        <h2 className="section-title">{aboutData.section1.title}</h2>
        <p className="main-text">{aboutData.section1.main_text}</p>
        <div className="vision-boxes">
          <p className="box-item">
            <strong>Misyon:</strong> {aboutData.section1.mission}
          </p>
          <p className="box-item">
            <strong>Vizyon:</strong> {aboutData.section1.vision}
          </p>
        </div>
      </motion.section>

      {/* Bölüm 2: Değer Teklifi ve Farkımız (Focus'tan gelen 4 temel değer) */}
      <motion.section
        className="about-section values-section"
        variants={itemVariants}
      >
        <h2 className="section-title">{aboutData.section2.title}</h2>
        <p className="intro-text">{aboutData.section2.intro}</p>

        <div className="values-grid">
          {Object.values(aboutData.section2.values).map((value, index) => (
            <motion.div
              className="value-card"
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={index} // Sıralı gecikme için
            >
              <h3 className="card-title">{value.title}</h3>
              <p className="card-description">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Bölüm 3: Ekip ve Kültür */}
      <motion.section
        className="about-section team-culture"
        variants={itemVariants}
      >
        <h2 className="section-title">{aboutData.section3.title}</h2>
        <p className="main-text">{aboutData.section3.main_text}</p>

        <div className="expertise-container">
          <h3 className="expertise-intro">
            {aboutData.section3.expertise_intro}
          </h3>
          <ul className="expertise-list">
            {aboutData.section3.expertise.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index + 4} // Önceki animasyonlardan sonra başlaması için
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <p className="culture-philosophy">
          {aboutData.section3.culture_philosophy}
        </p>
      </motion.section>

      {/* Bölüm 4: Harekete Geçirme (CTA) */}
      <motion.section
        className="about-section cta-section"
        variants={itemVariants}
      >
        <h2 className="cta-title">{aboutData.section4.title}</h2>
        <p className="cta-intro">{aboutData.section4.intro}</p>
        <p className="cta-outro">{aboutData.section4.outro}</p>
        <div className="cta-buttons">
          <motion.a
            href="/contact"
            className="cta-button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaData.options.consult.button}
          </motion.a>
          <motion.a
            href="/contact"
            className="cta-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaData.options.offer.button}
          </motion.a>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;
