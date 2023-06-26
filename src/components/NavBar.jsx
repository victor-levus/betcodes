import React, { useEffect, useState } from "react";
import {
  MdAppRegistration,
  MdClose,
  MdLogin,
  MdLogout,
  MdMenu,
  MdPeople,
  MdPerson,
  MdPerson3,
} from "react-icons/md";
import useComponentVisible from "../hooks/useComponentVisible";
import Modal from "./Modal";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import authService from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../services/userService";

const NavBar = () => {
  const [menuSelect, setMenuSelect] = useState("");
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (error) {}
  };

  const toggleMenuOpen = () => {
    document.body.classList.toggle("open");
  };

  const toggleDropDown = () => {
    setIsComponentVisible(true);
  };

  const closeIsComponentVisible = () => {
    setIsComponentVisible(false);
  };

  const selectAuthMenu = (e) => {
    setMenuSelect(e.target.name);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (menuSelect === "sign--in-btn") {
        const { data } = await authService.login(formData);

        if (data.access) {
          document.getElementById("modal--close-btn").click();
          window.location.reload();
        }
      }

      if (menuSelect === "sign--up-btn") {
        const response = await register(formData);

        if (response.status === 201) {
          document.getElementById("modal--close-btn").click();

          const loginResponse = await authService.login({
            username: formData.username,
            password: formData.password,
          });

          if (loginResponse.status === 200) {
            setUser(response.data);
            window.location.reload();
          }

          if (loginResponse.status === 400) {
            // setUser(loginResponse.data)
            // window.location.reload();
          }
        }

        if (response.status === 400) {
          setError(response.data);
        }
      }
    } catch (error) {}
  };

  const logout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <div id="nav--bar">
      <Modal
        title={
          menuSelect === "sign--in-btn"
            ? "Sign In"
            : menuSelect === "sign--up-btn"
            ? "Sign Up"
            : null
        }
        body={
          menuSelect === "sign--in-btn" ? (
            <LoginForm onChange={handleChange} onSubmit={handleSubmit} />
          ) : menuSelect === "sign--up-btn" ? (
            <SignUpForm
              error={error}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          ) : null
        }
      />

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

          {user && (
            <button className="username--" type="button">
              <a>{user.username}</a>
            </button>
          )}

          <button id="account--btn" onClick={toggleDropDown} type="button">
            <MdPerson size={25} />
          </button>
        </nav>
      </nav>

      {isComponentVisible && (
        <div ref={ref} id="account--link" className="account--popup">
          {user ? (
            <div className="">
              <a href="/account">
                <button className="btn btn-outline-secondary w-100 mb-3">
                  {<MdPerson3 />} Account
                </button>
              </a>
              <a href="/forum">
                <button className="btn btn-outline-success w-100 mb-3">
                  {<MdPeople />} Forum
                </button>
              </a>
              <button onClick={logout} className="btn btn-outline-danger w-100">
                {<MdLogout size={20} />} Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={selectAuthMenu}
                name="sign--in-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-danger w-100 mb-3"
              >
                {<MdLogin />} Sign In
              </button>
              <button
                onClick={selectAuthMenu}
                name="sign--up-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-secondary w-100"
              >
                {<MdAppRegistration />} Sign Up
              </button>
            </>
          )}

          <button
            onClick={closeIsComponentVisible}
            className=" account--close-btn"
          >
            <MdClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
