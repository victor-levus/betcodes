import React, { useState } from "react";
import { useNavigate } from "react-router";
import authService from "../../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setusername] = useState();
  const [password, setpassword] = useState();

  async function doSubmit(e) {
    e.preventDefault();

    try {
      const result = await authService.login(username, password);
      console.log(result);
      if (result.access) {
        return navigate(-1);
      }
    } catch (error) {}
  }

  function handleChangeUsername(event) {
    var value = event.target.value;

    setusername(value);
  }

  function handleChangePassword({ currentTarget: input }) {
    var name = input.name;
    var value = input.value;

    setpassword(value);
  }

  return (
    <div>
      <div className="">
        <div className="">
          <h3 className="login--title">LOGIN</h3>
          <div className="form---container">
            <form className="login--form" onSubmit={doSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  onChange={handleChangeUsername}
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
                  onChange={handleChangePassword}
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
    </div>
  );
};

export default LoginPage;
