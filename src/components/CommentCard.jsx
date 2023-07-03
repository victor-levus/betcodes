import React, { useEffect, useState } from "react";

import ImageLogo from "../asserts/profile pics.png";
import { MdSend } from "react-icons/md";
import ReplyCard from "./ReplyCard";
import { saveComment } from "../services/postServices";
import { toast } from "react-toastify";
import moment from "moment";

const CommentCard = ({ post }) => {
  const [description, setDescription] = useState("");
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    setCommentData(post.comments);
  }, []);

  const loopComments = (comments) => {
    return !commentData
      ? null
      : commentData
          .sort((a, b) => (a.placed_at > b.placed_at ? -1 : 1))
          .map((c, i) => {
            return (
              <div key={c.id}>
                <div className="post--comment">
                  <img className="post--user-image" src={ImageLogo} alt="" />
                  <div className="w-100">
                    <div className="comment--box">
                      <div className="comment-head">
                        <p className="comment--user">{c.user}</p>
                        <p className="comment--time">
                          {moment(c.placed_at).format("MMM Do YY, HH:mm")}
                        </p>
                      </div>
                      <p>{c.description}</p>
                    </div>
                    <div className="comment--reply"></div>
                    <button onClick={toggleReply} className="ms-3">
                      Replies
                    </button>
                  </div>
                </div>

                <div className={`reply--cover`}>
                  <ReplyCard comment={c} />
                  <hr />
                </div>
              </div>
            );
          });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleSubmitComment = async () => {
    const commentForm = document.getElementById("comment-description");
    try {
      const result = await saveComment(post.id, { description: description });

      if (result.status === 201) {
        setCommentData([result.data, ...post.comments]);
        setDescription("");

        toast.success("Comment Submitted Successful");

        commentForm.value = "";
        return;
      }

      return console.log(result);
    } catch (error) {
      toast.error("" + error);
      return error;
    }
  };

  const toggleReply = (e) => {
    const element = e.target.parentElement.parentElement.nextElementSibling;
    element.classList.toggle("open--reply");
  };

  return (
    <>
      <div className="post--comments-cover">
        <div className="post--comment-input">
          <img className="post--user-image" src={ImageLogo} alt="" />
          <textarea
            name="comment-description"
            id="comment-description"
            cols=""
            rows="1"
            onChange={handleChange}
            placeholder="Write a public comment..."
          ></textarea>
          <button
            disabled={!description}
            onClick={handleSubmitComment}
            className="btn comment--send-btn"
          >
            <MdSend />
          </button>
        </div>

        <div className="comments--cover">{loopComments(commentData)}</div>
      </div>
    </>
  );
};

export default CommentCard;
