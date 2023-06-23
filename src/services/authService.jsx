import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";

const apiAuth = config.apiBetEndpoint + "/auth/jwt/create";
const apiUser = config.apiBetEndpoint + "/auth/users/me";
const tokenKey = "token";
const refreshKey = "refresh";

async function login(formData) {
  try {
    const promise = await http.post(apiAuth, formData);
    localStorage.setItem(tokenKey, promise.data.access);
    localStorage.setItem(refreshKey, promise.data.refresh);
    return promise.data;
  } catch (error) {
    if (error == "Error: Request failed with status code 401") {
      toast.error("Invalid Login Credential");
    } else if (error == "Error: Request failed with status code 400") {
      toast.error("Provide Username & Password");
    } else {
      toast.error(error + "");
    }
  }
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

async function logout() {
  localStorage.removeItem(tokenKey);
}

async function getCurrentUser() {
  try {
    const jwt = getJwt();
    if (!jwt) return null;

    http.setJwtHeader(jwt);

    const user = await http.get(apiUser);
    return user.data;
  } catch (ex) {
    return null;
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
};
