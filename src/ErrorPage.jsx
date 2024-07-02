import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "./global/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <div>
        <div>
          <p variant="h3">Oops!!!</p>
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
