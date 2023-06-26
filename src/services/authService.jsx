import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";

const apiAuth = config.apiBetEndpoint + "/auth/jwt/create";
const apiVerifyToken = config.apiBetEndpoint + "/auth/jwt/verify";
const apiUser = config.apiBetEndpoint + "/auth/users/me";
const tokenKey = "token";
const refreshKey = "refresh";

async function login(formData) {
  try {
    const response = await http.post(apiAuth, formData);
    localStorage.setItem(tokenKey, response.data.access);
    localStorage.setItem(refreshKey, response.data.refresh);
    return response;
  } catch (error) {
    if (error == "Error: Request failed with status code 401") {
      toast.error("Invalid Login Credential");
    } else if (error == "Error: Request failed with status code 400") {
      toast.error("Provide Username & Password");
    } else {
      toast.error(error.message + "");
    }
  }
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

async function logout() {
  localStorage.removeItem(tokenKey);
}

async function verifyToken() {
  const jwt = getJwt();
  if (!jwt) return null;
  else {
    try {
      const isTokenVerify = await http.post(apiVerifyToken, { token: jwt });

      return isTokenVerify ? isTokenVerify.statusText : null;
    } catch (error) {}
  }
}

async function getCurrentUser() {
  try {
    const jwt = getJwt();
    if (!jwt) return null;

    const isTokenVerify = await http.post(apiVerifyToken, { token: jwt });

    if (isTokenVerify.status) {
      http.setJwtHeader(jwt);

      const user = await http.get(apiUser);

      return user.data;
    }
  } catch (error) {
    if (error.message === "Request failed with status code 401") {
      // localStorage.removeItem("token");
    }
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

// eslint-disable-next-line
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  verifyToken,
};
