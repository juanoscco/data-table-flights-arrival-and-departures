import React from "react";
import logo from "../../logo.svg";
import "./Nav.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);
  const toggleBurger = () => setIsBurgerActive(!isBurgerActive);
  const handleNavItemClick = () => setIsBurgerActive(false);

  return (
    <div className="container-xl pt-2 pb-5">
      <nav className="nav text-white justify-content-between align-items-center">
        <Link to="/"><img src={logo} alt={logo} className="App-logo img-fluid" /></Link>
        <ul className={`nav-list ${isBurgerActive ? "active" : ""} d-flex gap-5`}>
          <li className="nav-item">
            
            <Link to="/departure" onClick={handleNavItemClick}>
              Salidas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/arrival" onClick={handleNavItemClick}>
              Llegadas
            </Link>
          </li>
        </ul>
        <div
          className={`burger ${isBurgerActive ? "active" : ""}`}
          onClick={toggleBurger}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
