import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Heading } from "@radix-ui/themes";
import _ from "lodash";

import EditBetModal from "./bets/EditBetModal";
import BetModal from "./bets/BetModal";
import { selectAllBets } from "../../store/slices/betsSlice";

const LatestBet = () => {
	const bets = useSelector(selectAllBets);

	const betsData = _.orderBy(bets, ["match_time"], ["desc"]).slice(0, 10);

	return (
		<Box className="">
			<Flex mb={"4"} justify="between" align={"end"}>
				<Heading mb="0">Latest Bets</Heading>

				<BetModal betData={bets} />
			</Flex>

			<Flex
				direction="column"
				gap="2"
				className="h-[539px] overflow-y-scroll no-scrollbar"
			>
				{betsData.map((betData) => (
					<EditBetModal
						key={betData.id}
						bets={bets}
						betData={betData}
						trigerType="bet-card"
					/>
				))}
			</Flex>
		</Box>
	);
};

export default LatestBet;
