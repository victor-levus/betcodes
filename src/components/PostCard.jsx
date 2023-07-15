import React, { useEffect, useState } from "react";

import ImageLogo from "../asserts/profile pics.png";
import { MdComment, MdThumbUp } from "react-icons/md";
import moment from "moment/moment";
import CommentCard from "./CommentCard";
import { deletePost } from "../services/postServices";
import authService from "../services/authService";

const PostCard = ({ post }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    const user = await authService.getCurrentUser();
    setUser(user);
  };

  const handleEditPost = async () => {};

  const handleDeletePost = async () => {
    const confirm = window.confirm("Are you sure to Delete");

    if (confirm) {
      try {
        const result = await deletePost(post.id);
        if (result) {
          console.log(result);
        }
      } catch (error) {}
    }
    return null;
  };

  const toggleCommentsCollapse = (e) => {
    const element = e.target.nextElementSibling;
    element.classList.toggle("open--reply");
  };

  return (
    <div>
      {post && (
        <div className="post--card-cover">
          <div className="profile--info">
            <img src={ImageLogo} alt="" />
            <div className="profile--name">
              <a href="#">{post.user}</a>
              <p>{moment(post.placed_at).format("MMM Do YY, HH:mm")}</p>
            </div>
          </div>

          <div className="post--description">
            <p>{post.description}</p>
          </div>

          {/* <div className="post--media">
            <hr />
            {/* <img
              // src="https://www.shutterstock.com/image-photo/man-who-rejoices-stadium-winning-260nw-1416620072.jpg"
              alt=""
            />
            <p>{post.media}</p>
          </div> */}

          <hr className="my-0" />

          <div className="post--reaction">
            <a href="#" className="reaction--like">
              <span className="count--"></span> <MdThumbUp />
            </a>

            {!user
              ? null
              : post.user === user.username && (
                  <p>
                    {/* <span onClick={handleEditPost} className="btn--action me-2">
                      Edit
                    </span> */}
                    <span className="btn--action" onClick={handleDeletePost}>
                      Delete
                    </span>
                  </p>
                )}

            <span className="">
              <span className="count-- pe-1">{post.comments.length}</span>
              <MdComment />
            </span>
          </div>

          <span
            onClick={toggleCommentsCollapse}
            className="reaction--comments count-- ms-3"
          >
            Comments
          </span>

          <div className="comments--collapse-cover">
            <hr className="my-2" />
            <CommentCard post={post} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
