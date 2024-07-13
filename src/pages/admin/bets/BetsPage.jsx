import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Flex } from "@radix-ui/themes";
import _ from "lodash";

import BetStatusFilter from "./BetStatusFilter";
import BetModal from "./BetModal";
import BetTable from "./BetTable";
import Pagination from "../../../components/Pagination";
import { selectAllBets } from "../../../store/slices/betsSlice";

const BetsPage = () => {
  const [searchParams] = useSearchParams();
  const bets = useSelector(selectAllBets);
  const statuses = ["SUCCESS", "LOST", "IN_PROGRESS"];
  const filterStatus = statuses.includes(searchParams.get("status"))
    ? searchParams.get("status")
    : undefined;

  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = 7;

  const betsData = _.filter(bets, function (o) {
    return filterStatus ? o.bet_status === filterStatus : o;
  });

  const sortBets = _.orderBy(betsData, ["match_time"], ["desc"]).slice(
    (page - 1) * pageSize,
    (page - 1) * pageSize + pageSize
  );

  const betCount = betsData?.length;

  return (
    <Box className="">
      <Flex justify={"between"} mb={"3"}>
        <BetStatusFilter />
        <BetModal />
      </Flex>

      <Flex direction="column" gap="2" mb="3">
        {sortBets.length > 0 && (
          <BetTable betsData={sortBets} title="List of Bets" />
        )}
      </Flex>

      <Pagination pageSize={pageSize} itemCount={betCount} currentPage={page} />
    </Box>
  );
};

export const metadata = {
  title: "BetCodes - Admin Bets",
  description: "We provide betting tips that has high possibility of happening",
};

export default BetsPage;
