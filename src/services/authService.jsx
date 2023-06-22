import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
// import { Navigate } from "react-router-dom";

const apiAuth = config.apiBetEndpoint + "/auth/jwt/create";
const tokenKey = "token";
const refreshKey = "refresh";

http.setJwt(getJwt());

async function login(username, password) {
  try {
    const promise = await http.post(apiAuth, { username, password });
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

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
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
