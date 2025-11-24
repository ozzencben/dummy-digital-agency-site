import { motion } from "framer-motion";
import { useContext, useState } from "react";
import LanguageContext from "../../context/language/LanguageContext";
import "./Contact.css";

const Contact = () => {
  const { t } = useContext(LanguageContext);

  const contact = t("contact");
  const packages = t("servicePackages");

  const [isActive, setIsActive] = useState(0);

  const handleClick = (index) => {
    setIsActive(index);
  };

  // Motion Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonHover = {
    whileHover: { scale: 1.05, backgroundColor: "#f0a500" },
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="contact-container aurora-bg">
      <motion.div
        className="contact-content"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="contact-header">
          <h1 className="contact-heading">{contact.heading}</h1>
          <p className="interested-text">{contact.interested} :</p>
        </div>

        <div className="content-options">
          {Object.entries(packages).map(([key, value], index) => (
            <motion.p
              className={`content-option ${isActive === index ? "active" : ""}`}
              key={key}
              onClick={() => handleClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {value.title}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <motion.form
        className="contact-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="contact-info">{contact.info}</p>
        <div className="name-row">
          <input
            type="text"
            className="contact-input"
            placeholder={contact.firstname}
          />
          <input
            type="text"
            className="contact-input"
            placeholder={contact.lastname}
          />
        </div>
        <input
          type="text"
          className="contact-input"
          placeholder={contact.email}
        />
        <input
          type="text"
          className="contact-input"
          placeholder={contact.budget}
        />
        <textarea
          type="text"
          className="contact-input"
          placeholder={contact.message}
        />

        <motion.button className="contact-button" {...buttonHover}>
          {contact.send}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;
