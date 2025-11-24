import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa"; 
import "./CTA.css"; 

// --- BİLEŞENLER ---

// Tekil Seçenek Kartı
const OptionCard = ({ data }) => {
  return (
    <motion.div 
      className="option-card"
      // Kartın üzerine gelindiğinde mekanik etki
      whileHover={{ 
        y: -10, 
        boxShadow: "15px 15px 0px var(--color-tertiary)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95, y: 0, boxShadow: "10px 10px 0px var(--helper-color-secondary)" }}
      // Ekrana girerken hafif yukarı kayarak gelsin
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="option-title">{data.title}</h3>
      <p className="option-description">{data.description}</p>
      
      <motion.button 
        className="option-button"
        // Buton üzerine gelindiğinde hafifçe büyüt
        whileHover={{ scale: 1.01, x: 5 }} 
        whileTap={{ scale: 0.98, x: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {data.button} 
        <FaArrowRight />
      </motion.button>
    </motion.div>
  );
}

// Ana CTA Bileşeni
const CTA = ({ t }) => {
  const ctaData = t("cta"); 

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"] 
  });

  // Paralaks ve Tilt Ayarları
  const translateYMain = useTransform(scrollYProgress, [0, 1], ["-150px", "150px"]); 
  const translateYSub = useTransform(scrollYProgress, [0, 1], ["-80px", "80px"]);   
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);

  // Arka plan metinleri
  const bgTextTop = "MARJINAL DIGITAL"; 
  const bgTextBottom = "TRANSFORM";

  return (
    <motion.section 
      ref={targetRef} 
      className="cta-section-container"
      style={{ perspective: "1200px" }}
    >
      <motion.div 
        className="cta-content-wrapper"
        style={{ rotateX }}
      >
        
        {/* ARKA PLAN PARALAKS METİNLERİ */}
        <motion.p className="cta-background-text cta-bg-text-top" style={{ y: translateYMain }}>
          {bgTextTop}
        </motion.p>
        <motion.p className="cta-background-text cta-bg-text-bottom" style={{ y: translateYSub }}>
          {bgTextBottom}
        </motion.p>

        {/* Ana CTA İçeriği */}
        <div className="cta-main-content">
          <h2 className="cta-heading">{ctaData.mainTitle}</h2>
          <p className="cta-subheading">{ctaData.subtitle}</p>
          
          {/* Seçenek Kartları */}
          <div className="cta-options">
            {Object.entries(ctaData.options).map(([key, value]) => (
              <OptionCard key={key} data={value} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CTA;