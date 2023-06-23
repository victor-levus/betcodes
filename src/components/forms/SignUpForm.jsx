import React from "react";

const SignUpForm = ({ onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="first_name" className="form-label">
          First Name
        </label>
        <input
          onChange={onChange}
          type="text"
          className="form-control"
          id="first_name"
          name="first_name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="last_name" className="form-label">
          Last Name
        </label>
        <input
          onChange={onChange}
          type="text"
          className="form-control"
          id="last_name"
          name="last_name"
        />
      </div>

      <div className="mb-3">
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
      </div>

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

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          onChange={onChange}
          type="number"
          className="form-control"
          id="phone"
          name="phone"
        />
      </div>

      <button type="submit" className="btn btn-secondary submit--button">
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;
