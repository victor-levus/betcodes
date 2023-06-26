import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

import userImage from "../../asserts/profile pics.png";
import Loading from "../../components/Loading";
import authService from "../../services/authService";
import { getMyPosts, savePost } from "../../services/postServices";
import { toast } from "react-toastify";
import PosterCard from "../../components/chakra/PosterCard";
import ExpiredSessionAlert from "../../components/ExpiredSessionAlert";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [postData, setPostData] = useState("");
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
    console.log(result);
    if (!result) {
      setExpiredSession(true);
    }
  };

  const getForumPosts = async () => {
    try {
      const result = await getMyPosts();

      if (!result.data) return toast.error("Error");
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
          return (
            <h6
              style={{ borderBottom: "1px dashed gray", textAlign: "justify" }}
              className="pb-3 pt-2"
              key={item.id}
            >
              {item.description}
            </h6>
          );
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
      <div id="profile--page">
        <div className="content-container">
          <div className="">
            <div className="profile--container">
              <div className="profile-bio">
                <div className="user--profile-container">
                  <div className="user--image">
                    <img src={userImage} alt="" />
                  </div>
                  <div className="user--info">
                    {!user ? (
                      <Loading />
                    ) : (
                      <>
                        <h2>Name: {`${user.first_name} ${user.last_name}`}</h2>
                        <h4>Email: {user.email}</h4>
                        <h4>Membership: {"Regular"}</h4>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="py-3">Your Profile Page</h3>
              <form onSubmit={handlePostSubmit}>
                <div className="mb-3">
                  {/* <label for="exampleInputEmail1" className="form-label"></label> */}
                  <div>
                    <textarea
                      id="post---form"
                      cols="30"
                      rows="3"
                      className="profile-textarea"
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
                <div className="post--title mb-3 fs-5">Your Posts</div>
                {!postData ? (
                  <Loading />
                ) : postData.length === 0 ? (
                  <PosterCard text1={"You haven't Posted yet"} />
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

export default ProfilePage;
