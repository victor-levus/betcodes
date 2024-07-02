import React from "react";
import { SquareIcon } from "@radix-ui/react-icons";
import { FaCheck, FaTimes } from "react-icons/fa";

const BetStatusBadge = ({ bet }) => {
  return (
    <div>
      {bet.bet_status === "SUCCESS" && (
        <FaCheck className="text-green-500 text-md" />
      )}
      {bet.bet_status === "IN_PROGRESS" && (
        <SquareIcon className="text-md text-slate-500" />
      )}
      {bet.bet_status === "LOST" && (
        <FaTimes className="text-red-500 text-md" />
      )}
    </div>
  );
};

export default BetStatusBadge;
