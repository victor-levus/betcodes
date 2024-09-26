import React from "react";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import moment from "moment";
import EditBetModal from "./EditBetModal";
import BetStatusBadge from "../../home/BetStatusBadge";

const BetTable = ({ bets, betsData, title, tableType }) => {
	const tableHeader = [
		{ label: "HOME TEAM", className: "" },
		{ label: "AWAY TEAM", className: "" },
		{ label: "BET EVENT", className: "" },
		{
			label: "ODD",
			className: `hidden md:table-cell ${tableType === "sm" ? "hidden" : ""}`,
		},
		{
			label: "HT SCORE",
			className: `hidden md:table-cell ${tableType === "sm" ? "hidden" : ""}`,
		},
		{
			label: "FT SCORE",
			className: `hidden md:table-cell ${tableType === "sm" ? "hidden" : ""}`,
		},
		{
			label: "MATCH DATE",
			className: `hidden md:table-cell ${tableType === "sm" ? "hidden" : ""}`,
		},
		{ label: "STATUS", className: "" },
	];

	const smallTableHeader = [
		{ label: "HOME", className: "" },
		{ label: "AWAY", className: "" },
		{ label: "EVENT", className: "" },
		{ label: "STATUS", className: "" },
	];

	const usedTableHead = tableType === "sm" ? smallTableHeader : tableHeader;

	return (
		<Card>
			<Flex gap="6" align="center" justify={"between"} mb={"5"}>
				<Heading>{title}</Heading>
				<span className="text-gray-600 mr-4 border-1 border-gray-800 rounded-md px-3 py-1 font-sans font-semibold">
					Bets: {bets?.length}
				</span>
			</Flex>

			<Table.Root>
				<Table.Header>
					<Table.Row className="">
						{usedTableHead.map((th) => (
							<Table.Cell className={th.className} key={th.label}>
								{th.label}
							</Table.Cell>
						))}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{betsData.map((bet, i) => (
						<Table.Row key={bet.id}>
							<Table.Cell>
								<EditBetModal bets={bets} betData={bet} />
							</Table.Cell>

							<Table.Cell>{bet.away_team}</Table.Cell>

							<Table.Cell>{bet.bet}</Table.Cell>

							<Table.Cell
								className={
									tableType === "sm" ? "hidden--cell" : "hidden md:table-cell"
								}
							>
								{bet.odd.toString()}
							</Table.Cell>

							<Table.Cell
								className={
									tableType === "sm" ? "hidden--cell" : "hidden md:table-cell"
								}
							>
								{bet.ht_home_score} - {bet.ht_away_score}
							</Table.Cell>

							<Table.Cell
								className={
									tableType === "sm" ? "hidden--cell" : "hidden md:table-cell"
								}
							>
								{bet.ft_home_score} - {bet.ft_away_score}
							</Table.Cell>

							<Table.Cell
								className={
									tableType === "sm" ? "hidden--cell" : "hidden md:table-cell"
								}
							>
								<Flex className="" direction={"column"}>
									<span>{moment(bet.match_time).format("D MMM YY")}</span>
									<span>{moment(bet.match_time).format("HH:mm")}</span>
								</Flex>
							</Table.Cell>

							<Table.Cell className="text--info">
								<BetStatusBadge bet={bet} />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};

export default BetTable;
