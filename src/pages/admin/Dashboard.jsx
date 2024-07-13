import React from "react";
import { useSelector } from "react-redux";
import { Flex, Grid } from "@radix-ui/themes";
import _ from "lodash";

import LatestBet from "./LatestBets";
import BetSummary from "./BetSummary";
import BetChart from "./BetChart";
import TeamStatistic from "./TeamStatistic";
import { selectAllBets } from "../../store/slices/betsSlice";

const AdminDashboard = () => {
  const bets = useSelector(selectAllBets);
  // const bets = [];

  const inProgress = _.filter(bets, function (o) {
    return o.bet_status === "IN_PROGRESS";
  }).length;

  const success = _.filter(bets, function (o) {
    return o.bet_status === "SUCCESS";
  }).length;

  const lost = _.filter(bets, function (o) {
    return o.bet_status === "LOST";
  }).length;

  return (
    <Grid>
      <Grid columns={{ initial: "1", md: "2" }} gap={"3"} mt={"5"}>
        {/* <p>{data}</p> */}
        <Flex direction={"column"} gap={"6"}>
          <BetSummary success={success} inProgress={inProgress} lost={lost} />
          <BetChart success={success} inProgress={inProgress} lost={lost} />
        </Flex>

        <LatestBet />
      </Grid>

      <TeamStatistic bets={bets} />
    </Grid>
  );
};

// export const metadata = {
//   title: "BetCodes - Admin Dashboard",
//   description: "We provide betting tips that has high possibility of happening",
// };

export default AdminDashboard;
