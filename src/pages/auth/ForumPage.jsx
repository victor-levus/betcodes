import React, { useContext, useState } from "react";
import { AppContext } from "../../context/ProductContext";
import { Navigate, useNavigate } from "react-router";
import { savePost } from "../../services/postServices";
import { toast } from "react-toastify";

const ForumPage = () => {
  const navigate = useNavigate();
  const { userData: user, postData } = useContext(AppContext);
  const [postDescription, setPostDescription] = useState();

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
        toast.success("Post Submitted Successful");

        postForm.value = "";
        return;
      }
      return toast.error("Internal Server Error");
    } catch (error) {
      return toast.error(error + "");
    }
  };

  const handlePostChange = (event) => {
    var value = event.target.value;

    setPostDescription(value);
  };

  return (
    <>
      {!user ? (
        navigate("/login")
      ) : (
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

                  {loopPosts()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForumPage;
