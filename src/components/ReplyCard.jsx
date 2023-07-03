import React, { useEffect, useState } from "react";

import ImageLogo from "../asserts/profile pics.png";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import { saveReply } from "../services/postServices";
import moment from "moment";

const ReplyCard = ({ comment = {} }) => {
  const [description, setDescription] = useState("");
  const [replyData, setReplyData] = useState([]);

  useEffect(() => {
    setReplyData(comment.replys);
  }, []);

  const loopReplys = (replys) => {
    return !replys
      ? null
      : replys
          .sort((a, b) => (a.placed_at > b.placed_at ? -1 : 1))
          .map((r) => {
            return (
              <div key={r.id}>
                <div className="post--comment">
                  <img className="post--user-image" src={ImageLogo} alt="" />
                  <div className="w-100">
                    <div className="comment--box">
                      <div className="comment-head">
                        <p className="comment--user">{r.user}</p>
                        <p className="comment--time">
                          {moment(r.placed_at).format("MMM Do YY, HH:mm")}
                        </p>
                      </div>
                      <p>{r.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleSubmitReply = async () => {
    const replyForm = document.getElementById("reply-description");
    try {
      const result = await saveReply(comment.post, comment.id, {
        description: description,
      });

      if (result.status === 201) {
        setReplyData([result.data, ...comment.replys]);
        setDescription("");

        toast.success("Reply Submitted Successful");

        replyForm.value = "";
        return;
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="post--comments-cover reply---cover">
        <div className="post--comment-input">
          <img className="post--user-image" src={ImageLogo} alt="" />
          <textarea
            name="comment-description"
            id="reply-description"
            cols=""
            rows="1"
            onChange={handleChange}
            placeholder="Write a reply..."
          ></textarea>
          <button
            disabled={!description}
            onClick={handleSubmitReply}
            className="btn comment--send-btn"
          >
            <MdSend />
          </button>
        </div>

        <div className="comments--cover">{loopReplys(replyData)}</div>
      </div>
    </>
  );
};

export default ReplyCard;
