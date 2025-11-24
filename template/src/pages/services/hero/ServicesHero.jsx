import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GoArrowDown } from "react-icons/go";
import "./ServicesHero.css";

const ServicesHero = ({ t }) => {
  const hero = t("hero");
  const words = Object.values(t("hero.bigWords")); // ← burada object → array

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="services-hero-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline
        preload="autoPlay"
        className="hero-video"
      >
        <source src="/videos/spider.mp4" type="video/mp4" />
      </video>

      <div className="hero-entry">
        <div className="hero-text-container">
          {/* SPIDER TEXT */}
          <motion.p
            className="hero-spider"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            {hero.spider}
          </motion.p>

          {/* SLOGAN */}
          <motion.h1
            className="hero-slogan"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {hero.slogan2}
          </motion.h1>

          {/* PARAGRAPH */}
          <motion.p
            className="hero-paragraph"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {hero.paragraph}
          </motion.p>

          {/* BIG WORDS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hero-words"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="hero-word"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* READ MORE + ARROW */}
        <motion.div
          className="hero-read-more"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <span className="read-more">{hero.readMore}</span>
          <span>
            <GoArrowDown className="read-more-icon" />
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesHero;
