import React from "react";
import { FaCheck, FaTimes, FaSquare } from "react-icons/fa";
import moment from "moment";

const check = <FaCheck className="check--icon" />;
const cross = <FaTimes className="cross--icon" />;
const box = <FaSquare className="box--icon" />;

const BetDisplayCard = (item) => {
  return (
    <div>
      <div className="card-container">
        <div className="bet-info">
          <div className="team-names">
            <span>{item.home_team}</span>
            <span>{item.away_team}</span>
          </div>
          <div className="bet-event">
            {item.bet}
            <p className="odd--figure">odd: @{item.odd}</p>
          </div>
        </div>
        <div className="bet-result-info">
          <div className="match-time">
            <span>{moment(item.match_time).format("ddd D")}</span>
            <span>{moment(item.match_time).format("hh:mm A")}</span>
          </div>
          <div className="match-result">
            <div className="scores">
              {item.ht_away_score !== null && (
                <span>
                  HT: {item.ht_home_score} - {item.ht_away_score}
                </span>
              )}
              {item.ft_away_score !== null && (
                <span>
                  FT: {item.ft_home_score} - {item.ft_away_score}
                </span>
              )}
            </div>
          </div>
          <div className="bet-remark">
            {item.ft_away_score !== null ? (
              <span>{item.remark ? check : cross}</span>
            ) : (
              box
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetDisplayCard;
