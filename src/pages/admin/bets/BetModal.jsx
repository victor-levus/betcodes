import { zodResolver } from "@hookform/resolvers/zod";
import {
	AlertDialog,
	Box,
	Button,
	Dialog,
	Flex,
	Separator,
	Text,
	TextField,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ErrorMessage from "../../../components/ErrorMessage";
import SelectInput from "../../../components/SelectInput";
import { betSchema } from "../../../validationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewBet,
	getaddBetError,
	getaddBetStatus,
} from "../../../store/slices/betsSlice";
import AppSpinner from "../../../components/AppSpinner";
import TextSuggestion from "../../../components/TextSuggestion";
import {
	getCompetitionList,
	getEventList,
	getTeamList,
} from "../../../utils/getTeanList";

const BetModal = ({ betData }) => {
	const dispatch = useDispatch();
	const addBetStatus = useSelector(getaddBetStatus);
	const addBetError = useSelector(getaddBetError);

	const [error, setError] = useState("");
	const [open, setOpen] = useState(false);
	const [teamList, setTeamList] = useState([]);
	const [eventList, setEventList] = useState([]);
	const [competitionList, setCompetitionList] = useState([]);
	const [formFieldData, setFormFieldData] = useState({});

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(betSchema),
	});

	const selectOptions = [
		{ label: "Success", value: "SUCCESS" },
		{ label: "In Progress", value: "IN_PROGRESS" },
		{ label: "Lost", value: "LOST" },
	];

	useEffect(() => {
		const result = getTeamList(betData);
		const result2 = getEventList(betData);
		const result3 = getCompetitionList(betData);
		setTeamList(result);
		setEventList(result2);
		setCompetitionList(result3);

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			setFormFieldData(value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const submitForm = handleSubmit(async (data) => {
		const trimData = {
			away_team: data.away_team.trim(),
			bet: data.bet.trim(),
			bet_status: data.bet_status,
			competition: data.competition.trim(),
			ft_away_score: data.ft_away_score,
			ft_home_score: data.ft_home_score,
			home_team: data.home_team.trim(),
			ht_away_score: data.ht_away_score,
			ht_home_score: data.ht_home_score,
			match_time: data.match_time,
			odd: data.odd,
		};

		const betFormData = Object.entries(trimData).reduce(
			(a, [k, v]) => (v === "" ? a : ((a[k] = v), a)),
			{}
		);

		const { error, meta } = await dispatch(addNewBet(betFormData));

		if (error) {
			setError(error?.message);
			return;
		}

		if (meta?.requestStatus === "fulfilled") {
			toast.success("Bet added successful");

			reset();
			setOpen(false);
		}
	});

	return (
		<>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						The operation was not successful.
						<Text className="block">Error: {addBetError}</Text>
					</AlertDialog.Description>
					<Flex mt={"4"} justify={"between"}>
						<Button
							className="bg-none"
							onClick={() => setError(false)}
							//   variant="soft"
						>
							Ok
						</Button>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger>
					<Button variant="outline">Add Bet</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Add Bet</Dialog.Title>

					<form onSubmit={submitForm}>
						<Flex direction="column" gap="5">
							<Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
								<label>
									<Text as="div" size="2" mb="1">
										Home Team
									</Text>
									<TextField.Root
										defaultValue=""
										placeholder=""
										autoComplete="off"
										{...register("home_team")}
									/>
									<ErrorMessage> {errors.home_team?.message}</ErrorMessage>
									{formFieldData?.home_team && (
										<TextSuggestion
											dataList={teamList}
											search={formFieldData?.home_team}
											setFieldValue={setValue}
											type={"home_team"}
										/>
									)}
								</label>

								<label>
									<Text as="div" size="2" mb="1">
										Away Team
									</Text>
									<TextField.Root
										defaultValue=""
										placeholder=""
										autoComplete="off"
										{...register("away_team")}
									/>
									<ErrorMessage> {errors.away_team?.message}</ErrorMessage>
									{formFieldData?.away_team && (
										<TextSuggestion
											dataList={teamList}
											search={formFieldData?.away_team}
											setFieldValue={setValue}
											type={"away_team"}
										/>
									)}
								</label>

								<label>
									<Text as="div" size="2" mb="1">
										Bet Event
									</Text>
									<TextField.Root
										defaultValue=""
										placeholder=""
										autoComplete="off"
										{...register("bet")}
									/>
									<ErrorMessage> {errors.bet?.message}</ErrorMessage>
									{formFieldData?.bet && (
										<TextSuggestion
											dataList={eventList}
											search={formFieldData?.bet}
											setFieldValue={setValue}
											type={"bet"}
										/>
									)}
								</label>
							</Flex>

							<Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
								<label>
									<Text as="div" size="2" mb="1">
										Odd
									</Text>
									<TextField.Root
										type="number"
										step=".01"
										{...register("odd")}
									/>
									<ErrorMessage> {errors.odd?.message}</ErrorMessage>
								</label>

								<Flex gap={"3"}>
									<label className="w-full">
										<Text as="div" size="2" mb="1">
											Match Time
										</Text>
										<TextField.Root
											type="datetime-local"
											{...register("match_time")}
										/>
										<ErrorMessage> {errors.match_time?.message}</ErrorMessage>
									</label>

									<label className="w-full">
										<Text as="div" size="2" mb="1">
											Bet Status
										</Text>
										<SelectInput
											selectOptions={selectOptions}
											defaultValue={"IN_PROGRESS"}
											register={register("bet_status")}
											className="w-full"
										/>
										<ErrorMessage> {errors.bet_status?.message}</ErrorMessage>
									</label>
								</Flex>
							</Flex>

							<Separator color="gray" size="4" my={"3"} />

							<Flex direction={"column"} gap="5">
								<Box>
									<label className="w-full">
										<Text as="div" size="2" mb="1">
											Competition
										</Text>
										<TextField.Root
											defaultValue=""
											placeholder=""
											autoComplete="off"
											{...register("competition")}
										/>
										<ErrorMessage> {errors.competition?.message}</ErrorMessage>
										{formFieldData?.competition && (
											<TextSuggestion
												dataList={competitionList}
												search={formFieldData?.competition}
												setFieldValue={setValue}
												type={"competition"}
											/>
										)}
									</label>
								</Box>

								<Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
									<Flex gap={"3"}>
										<label className="w-full">
											<Text as="div" size="2" mb="1">
												HT Score Home
											</Text>
											<TextField.Root
												type="number"
												{...register("ht_home_score")}
											/>
										</label>

										<label className="w-full">
											<Text as="div" size="2" mb="1">
												HT Score Away
											</Text>
											<TextField.Root
												type="number"
												{...register("ht_away_score")}
											/>
										</label>
									</Flex>

									<Flex gap={"3"}>
										<label className="w-full">
											<Text as="div" size="2" mb="1">
												FT Score Home
											</Text>
											<TextField.Root
												type="number"
												{...register("ft_home_score")}
											/>
										</label>

										<label className="w-full">
											<Text as="div" size="2" mb="1">
												FT Score Away
											</Text>
											<TextField.Root
												type="number"
												{...register("ft_away_score")}
											/>
										</label>
									</Flex>
								</Flex>
							</Flex>
						</Flex>

						<Flex gap="3" mt="5" justify="end">
							<Dialog.Close>
								<Button variant="outline" color="gray" onClick={() => reset()}>
									Cancel
								</Button>
							</Dialog.Close>
							{/* <Dialog.Close>
                <Button type="submit">Save</Button>
              </Dialog.Close> */}

							<Button
								disabled={addBetStatus === "loading"}
								variant="outline"
								type="submit"
								className="w-[75px]"
							>
								{addBetStatus === "loading" ? (
									<>Save {<AppSpinner size={1} />}</>
								) : (
									"Save"
								)}
							</Button>
						</Flex>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</>
	);
};

export default BetModal;
