import React from "react";

const Loading = ({ loadType }) => {
  return (
    <div className={`d-flex justify-content-center loading ${loadType}`}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
