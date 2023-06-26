import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";
import authService from "./authService";

const apiPosts = config.apiBetEndpoint + "/betcodes/posts/";
const apiMyPosts = config.apiBetEndpoint + "/betcodes/profileposts/";

function postUrl(id) {
  return `${apiPosts}${id}`;
}

export function getPosts() {
  try {
    const jwt = authService.getJwt();

    if (!jwt) return;

    http.setJwtHeader(jwt);
    const result = http.get(apiPosts);

    return result;
  } catch (error) {}
}

export function getMyPosts() {
  try {
    const jwt = authService.getJwt();

    if (!jwt) return;

    http.setJwtHeader(jwt);
    const result = http.get(apiMyPosts);

    return result;
  } catch (error) {}
}

export function getPost(postId) {
  return http.get(postUrl(postId));
}

export function deletePost(postId) {
  return http.delete(postUrl(postId));
}

export function savePost(post) {
  try {
    if (post._id) {
      const body = { ...post };
      delete body._id;
      return http.put(postUrl(post._id), body);
    }
    return http.post(apiPosts, post);
  } catch (error) {
    if (error == "Error: Request failed with status code 400") {
      toast.error("You cannot submit empty post");
    } else {
      toast.error(error + "");
    }
  }
}
