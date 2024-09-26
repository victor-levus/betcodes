import React from "react";
import { Box, Flex } from "@radix-ui/themes";
import moment from "moment-timezone";
import BetStatusBadge from "./BetStatusBadge";

const BetCard = ({ betData }) => {
	if (!betData) return <p>Loading...</p>;

	return (
		<div>
			<Box px="3" pt="1" pb="2" className="bg--2 rounded-md">
				<Flex>
					<p className="bg--2 mb-1 font-mono text-[10px] italic text-stone-500">
						{betData?.competition}
					</p>
				</Flex>

				<Flex align={"baseline"} gap="3" className="text-slate-300">
					<Flex>
						<Flex
							direction="column"
							justify="center"
							// align="center"
							className="text--2xs text-slate-400"
						>
							<Box className="text--2xs">
								{moment(betData.match_time).format("D MMM")}
							</Box>
							<Box className="text--3xs">
								{moment.tz(betData.match_time, "Africa/Lagos").format("HH:mm")}
							</Box>
						</Flex>
					</Flex>

					<Flex align="baseline" flexGrow={"1"} justify={"between"}>
						<Flex direction="column">
							<Flex gap="1" direction="column" className="" flexGrow={"1"}>
								<Box>{betData.home_team}</Box>
								<Box>{betData.away_team}</Box>
							</Flex>
						</Flex>

						<Flex gap="3" className=" text--xs text--accent" align="center">
							<Flex direction="column" align="end" justify="center">
								<Box>{betData.bet}</Box>
								<Box className="w-max text--2xs text-slate-400">
									@{betData.odd.toString()}
								</Box>

								{(betData.ht_home_score != null ||
									betData.ft_home_score != null) && (
									<Flex gap="1" className="w-max text--2xs text-slate-500 mt-2">
										{betData.ht_home_score != null && (
											<Box>
												HT:{" "}
												{`${betData.ht_home_score}-${betData.ht_away_score}`}
											</Box>
										)}
										{betData.ft_home_score != null && (
											<Box>
												FT: {betData.ft_home_score}-{betData.ft_away_score}
											</Box>
										)}
									</Flex>
								)}
							</Flex>
							<BetStatusBadge bet={betData} />
						</Flex>
					</Flex>
				</Flex>
			</Box>
		</div>
	);
};

export default BetCard;
