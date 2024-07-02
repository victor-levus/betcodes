import axios from "axios";

const userURL = "http://localhost:8000/api/auth/";

const addHeader = (access_token) => {
  axios.defaults.headers.common["Authorization"] = `JWT ${access_token}`;
};

export const registerUser = async (body) => {
  const objectBody = { ...body, username: body.email };
  try {
    const result = await axios.post(userURL + "users/", objectBody);
    return result;
  } catch (error) {
    return error?.response;
  }
};

export const loginUser = async (body) => {
  const objectBody = { username: body.email, password: body.password };
  try {
    const result = await axios.post(userURL + "jwt/create/", objectBody);
    localStorage.setItem("token", result.data.access);
    // localStorage.setItem("token2", result.data.access + "badtoken");
    localStorage.setItem("refresh", result.data.refresh);
    return result;
  } catch (error) {
    // @ts-ignore
    return error?.response;
  }
};

export const getSession = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("no token");
    return;
  }

  try {
    const verifyToken = await axios.post(userURL + "jwt/verify/", { token });
    addHeader(token);
    return verifyToken;
  } catch (error) {
    try {
      const refresh = localStorage.getItem("refresh");
      const refreshToken = await axios.post(userURL + "jwt/refresh/", {
        refresh,
      });
      localStorage.setItem("token", refreshToken.data.access);
      getSession();
    } catch (error) {
      console.log("refresh token not valid");
    }
  }
};
