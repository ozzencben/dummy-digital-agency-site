import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import "./FAQ.css";

const FAQ = ({ t }) => {
  const faqContent = t("faq");
  const faqArray = Object.entries(faqContent);

  // Hangi FAQ'nun açık olduğunu tutar. İlk başta -1 (hiçbiri açık değil)
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleToggle = (index) => {
    // Tıklanan zaten açıksa kapat, değilse aç
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="faq-section-container">
      <h1 className="faq-title">{t("faqTitle")}</h1>

      <div className="faqs-container">
        {faqArray.map(([key, value], index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={key}
              className={`faq-card ${isActive ? "active" : ""}`}
              // Mekanik hover ve tap efektleri
              whileHover={{
                scale: 1.005,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
              whileTap={{ scale: 0.995 }}
              onClick={() => handleToggle(index)}
            >
              {/* SORU BAŞLIĞI */}
              <div className="question-box">
                <div className="faq-question">{value.question}</div>
                <FaPlus className={`faq-icon ${isActive ? "active" : ""}`} />
              </div>

              {/* CEVAP KUTUSU (Akordiyon Animasyonu) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="answer-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="faq-answer">{value.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
