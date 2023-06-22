const PosterCard = ({ text1, text2 }) => {
  return (
    <div className="card card--cover">
      <div className="card-body">{text1}</div>

      {text2 && <div className="card-body">{text2}</div>}
    </div>
  );
};

export default PosterCard;
