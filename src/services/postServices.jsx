import http from "./httpService";
import { toast } from "react-toastify";
import authService from "./authService";

const apiPosts = http.getApiEndPoint() + "/betcodes/posts/";
const apiMyPosts = http.getApiEndPoint() + "/betcodes/profileposts/";

function postUrl(id) {
  return `${apiPosts}${id}`;
}

function commentsUrl(postId) {
  return `${apiPosts}${postId}/comments/`;
}

function commentUrl(postId, commentId) {
  return `${apiPosts}${postId}/comments/${commentId}`;
}

function replysUrl(postId, commentId) {
  return `${apiPosts}${postId}/comments/${commentId}/replys/`;
}

function replyUrl(postId, commentId, replyId) {
  return `${apiPosts}${postId}/comments/${commentId}/replys/${replyId}`;
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

export function saveComment(postId, comment) {
  console.log(postId + " " + comment);
  try {
    if (comment._id) {
      const body = { ...comment };
      delete body._id;
      return http.put(commentUrl(postId, comment._id), body);
    }
    return http.post(commentsUrl(postId), comment);
  } catch (error) {
    return error;
  }
}

export function saveReply(postId, commentId, reply) {
  try {
    if (reply._id) {
      const body = { ...reply };
      delete body._id;
      return http.put(replyUrl(postId, commentId, reply._id), body);
    }
    return http.post(replysUrl(postId, commentId), reply);
  } catch (error) {
    if (error == "Error: Request failed with status code 400") {
      toast.error("You cannot submit empty post");
    } else {
      toast.error(error + "");
    }
  }
}
