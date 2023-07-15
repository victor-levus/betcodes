import http from "./httpService";
import { toast } from "react-toastify";

const apiUsers = http.getApiEndPoint() + "/auth/users/";

export async function register(formData) {
  try {
    return await http.post(apiUsers, formData);
  } catch (error) {
    toast.error(error.message);
    return error.response;
  }
}

function userUrl(id) {
  return `${apiUsers}/${id}`;
}

export function getUsers() {
  return http.get(apiUsers);
}

export function getUser(userId) {
  return http.get(userUrl(userId));
}

export function deleteUser(userId) {
  return http.delete(userUrl(userId));
}

export function saveUser(user) {
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return http.put(userUrl(user._id), body);
  }

  return http.post(apiUsers, user);
}
