import React from "react";
import { MdMenu } from "react-icons/md";

const NavBar = () => {
  const toggleMenuOpen = () => {
    document.body.classList.toggle("open");
  };

  return (
    <div id="nav--bar">
      <nav className="navbar">
        <div className="navbar-overlay" onClick={toggleMenuOpen}></div>

        <button
          type="button"
          className="navbar-burger"
          onClick={toggleMenuOpen}
        >
          <span className="material-icons">
            <MdMenu size={35} />
          </span>
        </button>
        <h1 className="navbar-title">
          <a className="navbar-brand1" href="/">
            BetCodes
          </a>
        </h1>
        <nav className="navbar-menu">
          <button className="active" type="button">
            <a href="/">Home</a>
          </button>
          <button type="button">
            <a href="/forum">Forum</a>
          </button>
          <button type="button">
            <a href="/account">Account</a>
          </button>
        </nav>
      </nav>
    </div>
  );
};

export default NavBar;
