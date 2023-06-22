import React from "react";
import { MdMenu } from "react-icons/md";
import useComponentVisible from "../hooks/useComponentVisible";

const NavBar = () => {
  const { ref, isComponentVisible } = useComponentVisible(true);

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
          <button ref={ref} type="button">
            <a>Account</a>
          </button>
        </nav>
      </nav>

      {isComponentVisible && (
        <div id="account--link" className="account--popup">
          {<h4>Account</h4>}
        </div>
      )}
    </div>
  );
};

export default NavBar;
