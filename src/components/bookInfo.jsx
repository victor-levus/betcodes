import React from "react";

function BookInfo({ bookCode, bookOdd }) {
  return (
    <div className="bottom--info">
      {bookCode && <div className="book--code">Bet9ja Code: {bookCode}</div>}
      {bookOdd && <div className="book--odd">Total Odd: {bookOdd}</div>}
    </div>
  );
}

export default BookInfo;
