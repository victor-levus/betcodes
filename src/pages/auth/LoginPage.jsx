import React, { useState } from "react";
import { useNavigate } from "react-router";
import authService from "../../services/authService";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { access } = await authService.login(formData);

    if (access) {
      return navigate(-1);
    }
  };

  return (
    <div>
      <div id="login">
        <h3 className="login--title">LOGIN</h3>
        <div className="form---container">
          <form className="login--form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
                name="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-dark mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
