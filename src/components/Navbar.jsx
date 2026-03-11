import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [navVisible, setNavVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update `isMobile` on screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNavLinks = () => {
    setNavVisible(!navVisible);
  };

  const links = [
    { to: "/brenman60-archive/dev", label: "Development" },
    { to: "/brenman60-archive/reviews", label: "Reviews" }
  ];

  return (
    <>
      <nav id={"headerNav"}>
        <NavLink to="/brenman60-archive/" className={"navLink"}>
          Home
        </NavLink>
      </nav>

      <button id={"hamburgerNav"} onClick={toggleNavLinks} type="button">...</button>

      <nav id={"nav"} className={navVisible ? "showLinks" : ""}>
        {links.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={`navLink ${navVisible ? "visible" : "closed"}`}
            style={
              isMobile
                ? {
                    top: `${index * 57 + 75}px`,
                    position: "static",
                    transition: `
                    left ${((index + 1) / 4) * 0.35}s ease-in, 
                    opacity ${((index + 1) / 4) * 0.35}s ease-in,
                    padding-top ${0.05}s ease-in,
                    background-color 0.25s ease-in,
                    border-bottom-width 0.05s ease-in`,
                  }
                : {
                    position: "relative",
                    transition: `
                    left ${((index + 1) / 4) * 0.35}s ease-in, 
                    opacity ${((index + 1) / 4) * 0.35}s ease-in,
                    padding-top 0.05s ease-in,
                    background-color 0.25s ease-in,
                    border-bottom-width 0.05s ease-in`,
                  }
            }
            onClick={toggleNavLinks}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
