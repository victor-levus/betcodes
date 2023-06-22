import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <div>
        <NavBar />
        <div className="app--cover">
          <h1>Oops</h1>
          <p>
            {isRouteErrorResponse(error)
              ? "This page does not exist"
              : "An unexpected error occured"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
