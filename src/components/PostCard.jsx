import React from "react";

import ImageLogo from "../asserts/profile pics.png";
import { MdComment, MdSend, MdThumbUp } from "react-icons/md";

const PostCard = ({ post, postuser, user }) => {
  return (
    <div>
      {post && (
        <div className="post--card-cover">
          <div className="profile--info">
            <img src={ImageLogo} alt="" />
            <a href="#">{post.user}</a>
          </div>

          <div className="post--description">
            <p>{post.description}</p>
          </div>

          <div className="post--media">
            <hr />
            <img
              src="https://www.shutterstock.com/image-photo/man-who-rejoices-stadium-winning-260nw-1416620072.jpg"
              alt=""
            />
            <p>{post.media}</p>
          </div>

          <div className="post--reaction">
            <a href="#" className="reaction--like">
              <span>520</span> <MdThumbUp />
            </a>

            <a href="#" className="reaction--comments">
              <span>38</span> <MdComment />
            </a>
          </div>

          <hr />

          <div className="post--comments-cover">
            <div className="post--comment-input">
              <img className="post--user-image" src={ImageLogo} alt="" />
              <textarea
                name="comment-description"
                id="comment-description"
                cols=""
                rows="1"
                placeholder="Write a public comment..."
              ></textarea>
              <div className="comment--send-btn">
                <MdSend />
              </div>
            </div>

            <div className="post--comments">
              <img className="post--user-image" src={ImageLogo} alt="" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                velit distinctio odio ea, sit minima voluptates ullam labore
                dicta officia vero, autem suscipit veritatis quisquam.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
