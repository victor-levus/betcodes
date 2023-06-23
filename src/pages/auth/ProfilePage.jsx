import React, { useContext } from "react";
import { useNavigate } from "react-router";

import userImage from "../../asserts/profile pics.png";
import { AppContext } from "../../context/ProductContext";

const ProfilePage = () => {
  const { userData: user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {!user ? (
        navigate("/login")
      ) : (
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
                      <h2>Name: {`${user.first_name} ${user.last_name}`}</h2>
                      <h4>Email: {user.email}</h4>
                      <h4>Membership: {"Regular"}</h4>
                    </div>
                  </div>
                </div>
                <h3 className="py-3">Your Profile Page</h3>
                <form>
                  <div className="mb-3">
                    {/* <label for="exampleInputEmail1" className="form-label"></label> */}
                    <div>
                      <textarea
                        cols="30"
                        rows="3"
                        className="profile-textarea"
                        placeholder="Type anything and post"
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-dark">
                    Post
                  </button>
                </form>
                <div className="posts-trend">Your Posts</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
