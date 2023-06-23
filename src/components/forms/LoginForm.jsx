import React from "react";

const LoginForm = ({ onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {/* <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          onChange={onChange}
          type="email"
          className="form-control"
          id="email"
          name="email"
        />
      </div> */}

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          onChange={onChange}
          type="text"
          className="form-control"
          id="username"
          name="username"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          onChange={onChange}
          type="password"
          className="form-control"
          id="password"
          name="password"
        />
      </div>

      <button type="submit" className="btn btn-secondary submit--button">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
