import React from "react";
import PosterCard from "./chakra/PosterCard";

const ExpiredSessionAlert = ({ value }) => {
  return (
    <div className={`expeired-session ${value ? "show-alert" : ""}`}>
      <PosterCard
        text1={
          "Is either you have not logged in or your session has expired, you need to login again"
        }
      />
    </div>
  );
};

export default ExpiredSessionAlert;
