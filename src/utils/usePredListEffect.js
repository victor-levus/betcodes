import { getEventList, getTeamList } from "./getTeanList";

export const predictionList = (betData) => {
	const teamList = getTeamList(betData);
	const eventList = getEventList(betData);

	return { teamList, eventList };
};
