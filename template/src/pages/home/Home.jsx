import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../context/language/LanguageContext";
import "./Home.css";

// ====================================
// FRAMER MOTION VARYANTLARI
// ====================================

// Genel görünüm/kaydırma ile görünme varyantı
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Kelime varyantları (Hero için özel)
const wordVariants = {
  hidden: { opacity: 0, scale: 0.5, rotateX: 90 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      type: "spring",
      stiffness: 100,
    },
  }),
};

// ====================================
// ANA SAYFA BÖLÜMLERİ
// ====================================

const Home = () => {
  const { t } = useContext(LanguageContext);

  // Tüm içerik verilerini çekme ve güvenli varsayılan değerler atama
  const homeContent = t("home", { returnObjects: true }) || {};

  const heroContent = homeContent.hero || {};
  const caseStudiesData = homeContent.caseStudies || {};
  const philosophyData = homeContent.philosophy || {};
  const expertiseData = homeContent.expertise || {};
  const ctaData = homeContent.cta_section || {};

  // Hero kelimelerini çekme ve Array olduğundan emin olma
  const heroWords = heroContent.bigWords;
  const words = Array.isArray(heroWords)
    ? heroWords
    : Object.values(heroWords || {});

  // Case Studies listesinin Array olduğundan emin olma (Güvenli map işlemi)
  const caseStudiesList = Array.isArray(caseStudiesData.list)
    ? caseStudiesData.list
    : [];

  // Felsefe adımları (Diziyi oluştururken güvenli erişim)
  const philosophySteps = [
    {
      id: 1,
      title: philosophyData.step1?.title,
      detail: philosophyData.step1?.detail,
      icon: "🔎",
    },
    {
      id: 2,
      title: philosophyData.step2?.title,
      detail: philosophyData.step2?.detail,
      icon: "💻",
    },
    {
      id: 3,
      title: philosophyData.step3?.title,
      detail: philosophyData.step3?.detail,
      icon: "🚀",
    },
  ];

  // Uzmanlık alanları (Diziyi oluştururken güvenli erişim)
  const expertiseAreas = [
    expertiseData.area1,
    expertiseData.area2,
    expertiseData.area3,
  ].filter((area) => area); // Boş objeleri filtrele

  return (
    <div className="home-container">
      {/* ====================================
               1. HERO SECTION (BÜYÜK AÇILIŞ)
            ==================================== */}
      <section className="home-section home-hero-section">
        {/* Yüksek enerjili, soyut ağ ve parıltı arka plan simülasyonu */}
        <div className="home-hero-background-effect">
          <div className="home-hero-central-glow"></div>
          <div className="home-hero-network-layer home-hero-layer-1"></div>
          <div className="home-hero-network-layer home-hero-layer-2"></div>
        </div>

        <div className="home-hero-content-wrapper">
          {/* Dinamik Tipografi Başlığı */}
          <motion.h1
            className="home-hero-big-words"
            style={{ perspective: 1000 }}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="home-hero-word"
              >
                {word}
                {index < words.length - 1 ? <span>&nbsp;</span> : null}
              </motion.span>
            ))}
          </motion.h1>

          {/* Alt Slogan */}
          <motion.p
            className="home-hero-subtext"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {heroContent.tagline}
          </motion.p>

          {/* CTA Butonları */}
          <motion.div
            className="home-hero-cta-group"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Link
              to="/contact"
              className="home-hero-cta-button home-hero-cta-primary"
            >
              {heroContent.cta_primary}
            </Link>
            <Link
              to="/works"
              className="home-hero-cta-button home-hero-cta-secondary"
            >
              {heroContent.cta_secondary}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====================================
               2. CASE STUDIES (BAŞARI HİKAYELERİ)
            ==================================== */}
      <motion.section
        className="home-section home-case-studies-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
      >
        <h2 className="home-section-title">{caseStudiesData.title}</h2>
        <p className="home-section-subtitle">{caseStudiesData.subtitle}</p>

        <div className="home-case-studies-container">
          {/* caseStudiesList kullanılarak güvenli map işlemi */}
          {caseStudiesList.map((item, index) => (
            <motion.div
              key={index}
              className="home-case-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <span className="home-case-client">{item.client}</span>
              <h3>{item.project}</h3>
              <div className="home-case-details">
                <p>
                  Odak: <span className="home-case-focus">{item.focus}</span>
                </p>
                <p>
                  Sonuç:{" "}
                  <span className="home-case-result-highlight">
                    {item.result}
                  </span>
                </p>
              </div>
              <Link to="/works" className="home-case-link-button">
                {caseStudiesData.link_text} <span>&rarr;</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="home-all-works-cta">
          <Link to="/works" className="home-text-link">
            {caseStudiesData.all_works_cta}
          </Link>
        </div>
      </motion.section>

      {/* ====================================
               3. PHILOSOPHY (ÜRETİM FELSEFESİ)
            ==================================== */}
      <motion.section
        className="home-section home-philosophy-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <h2 className="home-section-title">{philosophyData.title}</h2>
        <p className="home-section-subtitle">{philosophyData.subtitle}</p>

        <div className="home-step-process-container">
          {philosophySteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="home-step-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="home-step-header">
                <span className="home-step-number">
                  {philosophyData.step_label} {step.id}
                </span>
                <span className="home-step-icon">{step.icon}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>

              {/* Adımlar Arası Bağlantı Çizgisi (CSS ile yönetilecek) */}
              {index < philosophySteps.length - 1 && (
                <div className="home-connector-line"></div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ====================================
               4. EXPERTISE (UZMANLIK ALANLARI)
            ==================================== */}
      <motion.section
        className="home-section home-expertise-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
      >
        <h2 className="home-section-title">{expertiseData.title}</h2>
        <p className="home-section-subtitle">{expertiseData.subtitle}</p>

        <div className="home-expertise-grid">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              className="home-expertise-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className="home-expertise-name">{area?.name}</h3>
              <p className="home-expertise-desc">{area?.description}</p>
              <Link to="/services" className="home-more-info-link">
                {expertiseData.more_info_link} <span>&rarr;</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ====================================
               5. FINAL CTA (SON HAREKETE GEÇİRİCİ ÇAĞRI)
            ==================================== */}
      <motion.section
        className="home-section home-final-cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
      >
        <div className="home-cta-content">
          <h2 className="home-cta-heading">{ctaData.heading}</h2>
          <Link to="/contact" className="home-cta-button">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {ctaData.button}
            </motion.span>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
