import { MdOutlineArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  const links = [
    { name: "Github", url: "https://github.com/ozzencben" },
    { name: "Linkedin", url: "https://www.linkedin.com/in/%C3%B6zen%C3%A7-d%C3%B6nmezer-769125357/" },
    { name: "Instagram", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "Facebook", url: "#" },
  ];

  const pages = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="footer-container animated-gradient-bg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div className="footer-content" variants={itemVariants}>
        <img src="/logo/logo2.png" alt="Logo" className="logo" />
        <a className="footer-email-container" href="mailto:ozzencben@gmail.com">
          <span className="footer-email">example</span>
          <span className="footer-email-domain">@example.com</span>
        </a>
      </motion.div>

      <motion.div className="social-links" variants={itemVariants}>
        {links.map((link, index) => (
          <motion.div key={index} className="social-link-container" variants={itemVariants}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {link.name}
            </a>
            <MdOutlineArrowOutward className="arrow-icon" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="pages" variants={itemVariants}>
        {pages.map((page, index) => (
          <motion.a key={index} href={page.url} className="page-link" variants={itemVariants}>
            {page.name}
          </motion.a>
        ))}
      </motion.div>

      <motion.div className="created-by" variants={itemVariants}>
        <span>
          Created by
          <a className="ozzencben" href="mailto:ozzencben@gmail.com">
            Ozzencben
          </a>
        </span>
        <span className="copy-right">© 2025</span>
        <span> | </span>
        <span>All rights reserved</span>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
