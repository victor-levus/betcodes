import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    // toast.error('An unexpected error occurred.', error);
  }

  return Promise.reject(error);
});

function setJwtHeader(jwt) {
  axios.defaults.headers["Authorization"] = `${"JWT"} ${jwt}`;
}

function getApiEndPoint() {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_ENDPOINT
    : process.env.REACT_APP_DEV_ENDPOINT;
}

// eslint-disable-next-line
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwtHeader,
  getApiEndPoint,
};
