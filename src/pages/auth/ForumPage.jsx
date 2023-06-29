import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getPosts, savePost } from "../../services/postServices";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import Loading from "../../components/Loading";
import PosterCard from "../../components/chakra/PosterCard";
import ExpiredSessionAlert from "../../components/ExpiredSessionAlert";
import PostCard from "../../components/PostCard";

const ForumPage = () => {
  const [user, setUser] = useState();
  const [postData, setPostData] = useState();
  const [postDescription, setPostDescription] = useState();
  const [expiredSession, setExpiredSession] = useState(false);

  useEffect(() => {
    getCurrentUser();
    getForumPosts();
    verifyToken();
  }, []);

  const getCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (error) {}
  };

  const verifyToken = async () => {
    const result = await authService.verifyToken();
    if (!result) {
      setExpiredSession(true);
    }
  };

  const getForumPosts = async () => {
    try {
      const result = await getPosts();

      // if (!result.data) return toast.error("Error");
      setPostData(result.data);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        // localStorage.removeItem("token");
      }
    }
  };

  const loopPosts = () => {
    const sortData = [].concat(postData);

    if (postData === "") {
      return <h6>LOADING...</h6>;
    } else {
      if (sortData.length == 0) {
        return <h6>There is No post on the Database</h6>;
      }
      return sortData
        .sort((a, b) => (a.placed_at > b.placed_at ? -1 : 1))
        .map((item) => {
          return <PostCard post={item} key={item.id} />;
        });
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const postForm = document.getElementById("post---form");
      const result = await savePost({
        description: postDescription,
      });

      if (result.data) {
        getForumPosts();
        setPostDescription("");

        toast.success("Post Submitted Successful");

        postForm.value = "";
        return;
      }
      return toast.error("Internal Server Error");
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        // localStorage.removeItem("token");
      }
    }
  };

  const handlePostChange = (event) => {
    var value = event.target.value;

    setPostDescription(value);
  };

  // if (!authService.getJwt()) return <Navigate to={"/login"} />;

  return (
    <>
      <ExpiredSessionAlert value={expiredSession} />
      <div id="forum--page">
        <div className="content-container">
          <div className="">
            <div className="forum--container">
              <h3>Forum</h3>
              <form onSubmit={handlePostSubmit}>
                <div className="mb-3">
                  <div>
                    <textarea
                      id="post---form"
                      cols="30"
                      rows="3"
                      className="forum-textarea"
                      placeholder="Type anything and post"
                      onChange={handlePostChange}
                    ></textarea>
                  </div>
                </div>

                <button
                  disabled={!postDescription}
                  type="submit"
                  className="btn btn-dark"
                >
                  Post
                </button>
              </form>
              <div className="posts-trend">
                <div className="post---title">List of Posts</div>

                {!postData ? (
                  <Loading />
                ) : postData.length === 0 ? (
                  <PosterCard text1={"No post available"} />
                ) : (
                  loopPosts()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumPage;
