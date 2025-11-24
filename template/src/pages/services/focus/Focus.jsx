import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./Focus.css";

const Focus = ({ t }) => {
  const focusContent = t("focus");

  const cardRefs = useRef({});
  const [progress, setProgress] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Scroll animasyonu
  useEffect(() => {
    const handleScroll = () => {
      const newProgress = {};
      Object.entries(cardRefs.current).forEach(([key, card]) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Kartın yapışacağı nokta (Örn: Ekranın %20'si)
        const stickyStart = windowHeight * 0.2; 
        if (rect.top < stickyStart) {
          // Kart yapışma noktasını geçtikten sonra ilerleme hesapla
          newProgress[key] = Math.min(
            1,
            (stickyStart - rect.top) / stickyStart
          );
        } else {
          newProgress[key] = 0;
        }
      });
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ekran genişliği
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse hareketini takip etme
  const handleMouseMove = (e) => {
    if (isMobile || !hoveredItem) return;
    setHoveredItem((prev) => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
    }));
  };

  return (
    <div className="focus-container">
      <div className="focus-title-container">
        <h1 className="services-title">{t("focusTitle")}</h1>
      </div>
      <div className="focus-card-container">
        {Object.entries(focusContent).map(([key, value], index) => {
          return (
            <motion.div
              key={key}
              ref={(el) => (cardRefs.current[key] = el)}
              className="focus-card"
              style={{
                // Scale'i küçült
                scale: 1 - progress[key] * 0.1, 
                // DÜZELTME: Opacity'yi 1.5 ile çarparak hızlıca 0'a inmesini sağlıyoruz
                opacity: 1 - progress[key] * 1.5, 
                // Kartların üst üste yığılmasını sağla (en öndeki 10, arkadaki 9, 8...)
                zIndex: 10 - index, 
              }}
              // YENİ MEKANİK HOVER ANİMASYONU
              whileHover={{
                y: -5, 
                x: 10, 
                transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                }
              }}
              whileTap={{ scale: 0.98 }} 
              onMouseEnter={() =>
                setHoveredItem({ cardKey: key, x: 0, y: 0 })
              }
              onMouseLeave={() => setHoveredItem(null)}
              onMouseMove={handleMouseMove}
            >
              <h2 className="focus-card-title">{value.title}</h2>
              <p className="focus-card-subtitle">{value.subtitle}</p>

              <ul className="focus-card-list">
                {Object.entries(value.focusOn).map(([focusKey, focusValue]) => (
                  <li key={focusKey} className="focus-card-list-item">
                    {focusValue}
                  </li>
                ))}
              </ul>

              {/* Mobile hover mouse-follow */}
              {isMobile && hoveredItem?.cardKey === key && (
                <img
                  src={value.images.image1}
                  alt="Card Image"
                  className="focus-card-image"
                  style={{
                    position: "absolute",
                    left: hoveredItem.x,
                    top: hoveredItem.y,
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)",
                    opacity: 1,
                    transition: "transform 0.1s ease",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                  }}
                />
              )}

              {/* Desktop hover static */}
              {!isMobile && (
                <motion.img
                  src={value.images.image1}
                  alt="Card Image"
                  className="focus-card-image-desktop"
                  initial={{ opacity: 0 }}
                  animate={
                    hoveredItem?.cardKey === key
                      ? { opacity: 1, scale: 1.05 }
                      : { opacity: 0, scale: 1 }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Focus;