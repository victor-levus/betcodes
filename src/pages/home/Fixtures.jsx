import { Box, Card, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import moment from "moment";
import _ from "lodash";

import CarouselButton from "./CarouselButton";
import BetCard from "./BetCard";
import { useSelector } from "react-redux";
import { getBetStatus } from "../../store/slices/betsSlice";
// import Spinner from "./spinner";

const Fixtures = ({ bets }) => {
	const betStatus = useSelector(getBetStatus);
	const betCardRow =
		"md:h-[530px] md:flex-wrap md:overflow-x-scroll scrollbar-hide";

	const fixtureDate = [
		{
			dataBsSlideTo: "0",
			ariaLabel: "Slide 1",
			dateIndex: 3,
		},
		{
			dataBsSlideTo: "1",
			ariaLabel: "Slide 2",
			dateIndex: 2,
		},
		{
			dataBsSlideTo: "2",
			ariaLabel: "Slide 3",
			dateIndex: 1,
		},
		{
			dataBsSlideTo: "3",
			ariaLabel: "Slide 4",
			className: "active--btn",
			dateIndex: 0,
		},
		{
			dataBsSlideTo: "4",
			ariaLabel: "Slide 5",
			dateIndex: -1,
		},
		{
			dataBsSlideTo: "5",
			ariaLabel: "Slide 6",
			dateIndex: -2,
		},
		{
			dataBsSlideTo: "6",
			ariaLabel: "Slide 7",
			dateIndex: -3,
		},
	];

	const loopBets = (slideDate) => {
		const betsData = _.orderBy(bets, ["match_time"], ["asc"]);

		const filterBets = _.filter(betsData, function (o) {
			return moment(o.match_time).format("L") === slideDate;
		});

		if (betStatus === "loading") return <Spinner />;

		if (filterBets.length === 0)
			return (
				<Card className="p-3">
					<Text>There is no bets for the selected date</Text>
				</Card>
			);

		return filterBets.map((bet) => (
			<Box key={bet.id} className="min-w-[350px]">
				<BetCard betData={bet} />
			</Box>
		));
	};

	return (
		<Flex direction={"column"} gap={"5"} mt={"5"}>
			<Heading>Fixtures</Heading>

			<div className="caro--">
				<div id="carouselExampleIndicators" className="carousel slide">
					<Flex
						width={"100%"}
						gap="2"
						mb="4"
						justify={"between"}
						className="carousel-indicator"
					>
						{fixtureDate.map((fdate) => (
							<CarouselButton key={fdate.dateIndex} fixtureDate={fdate} />
						))}
					</Flex>

					{/* Carousel Inner Content */}
					<div className="carousel-inner mt-3">
						<div className="carousel-item">
							<Flex direction="column" gap={"2"} className={betCardRow}>
								{loopBets(moment().subtract(3, "days").format("L"))}
							</Flex>
						</div>

						<div className="carousel-item">
							<Flex direction="column" gap={"2"} className={betCardRow}>
								{loopBets(moment().subtract(2, "days").format("L"))}
							</Flex>{" "}
						</div>

						<div className="carousel-item">
							<Flex direction="column" gap={"2"} className={betCardRow}>
								{loopBets(moment().subtract(1, "days").format("L"))}
							</Flex>{" "}
						</div>

						<div className="carousel-item active">
							<Flex direction="column" gap={"2"} className={betCardRow}>
								{loopBets(moment().subtract(0, "days").format("L"))}
							</Flex>
						</div>

						<div className="carousel-item">
							<Flex direction="column" gap={"2"} className={betCardRow}>
								{loopBets(moment().subtract(-1, "days").format("L"))}
							</Flex>{" "}
						</div>

						<div className="carousel-item">
							<Flex direction="column" gap={"2"} className={betCardRow}>
								{loopBets(moment().subtract(-2, "days").format("L"))}
							</Flex>{" "}
						</div>

						<div className="carousel-item">
							<Flex direction="column" gap={"2"} className={betCardRow}>
								{loopBets(moment().subtract(-3, "days").format("L"))}
							</Flex>{" "}
						</div>
					</div>
				</div>
			</div>
		</Flex>
	);
};

export default Fixtures;
