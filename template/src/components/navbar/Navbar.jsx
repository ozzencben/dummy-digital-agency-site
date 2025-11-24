import { useState } from "react";
import LanguageSwitcher from "../switchers/language/LanguageSwitcher";
import ThemeSwitcher from "../switchers/theme/ThemeSwitcher";
import "./Navbar.css";

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);

  const toggleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  const closeNavbar = () => {
    setOpenNavbar(false);
  };

  const tabs = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      {/* Navbar Container: Açık/Kapalı sınıfını kontrol eder */}
      <div className={`navbar-container ${openNavbar ? "open" : ""}`}>
        
        {/* Hamburger: Açık/Kapalı sınıfını kontrol eder */}
        <div className={`hamburger ${openNavbar ? "open" : ""}`}>
          <input
            type="checkbox"
            id="checkbox"
            checked={openNavbar}
            onChange={toggleNavbar}
          />

          <label htmlFor="checkbox" className="toggle">
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </div>

        {/* Tabs: Navbar açıksa 'open' sınıfını ekle */}
        <div className={`tabs-container ${openNavbar ? "open" : ""}`}>
            {tabs.map((tab) => (
              <a 
                className="tab" 
                href={tab.path} 
                key={tab.name}
                onClick={closeNavbar} /* Tıklayınca menüyü kapat */
              >
                {tab.name}
              </a>
            ))}
        </div>
        

        {/* Switchers: Navbar açıksa 'open' sınıfını ekle */}
        <div className={`switchers-container ${openNavbar ? "open" : ""}`}>
            <ThemeSwitcher />
            <LanguageSwitcher />
        </div>

      </div>
      
      {/* Overlay: Açık/Kapalı sınıfını kontrol eder ve tıklamayla kapatır */}
      <div
        className={`navbar-overlay ${openNavbar ? "open" : ""}`}
        onClick={closeNavbar}
      ></div>
    </>
  );
};

export default Navbar;