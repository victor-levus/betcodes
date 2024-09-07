import React from "react";
import { useSelector } from "react-redux";
import { Box, Heading } from "@radix-ui/themes";
import _ from "lodash";

import SearchField from "./SearchField";
import { selectAllBets } from "../../../store/slices/betsSlice";

const TeamsAnalysis = () => {
  const bets = useSelector(selectAllBets);

  const betsData = _.orderBy(bets, ["match_time"], ["desc"]);

  // const betsData = [await prisma.betcode.findMany({
  //   orderBy: { match_time: "desc" },
  // })];

  return (
    <Box className="mt-9">
      <SearchField betsData={betsData} />
    </Box>
  );
};

export default TeamsAnalysis;
