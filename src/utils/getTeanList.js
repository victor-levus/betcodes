export const getTeamList = (dataArray = []) => {
	const dataKeys = [];

	// eslint-disable-next-line
	dataArray.map((b) => {
		if (!dataKeys.includes(b.home_team)) {
			dataKeys.push(b.home_team);
		}

		if (!dataKeys.includes(b.away_team)) {
			dataKeys.push(b.away_team);
		}
	});

	return dataKeys;
};

export const getEventList = (dataArray = []) => {
	const eventKeys = [];

	// eslint-disable-next-line
	dataArray.map((b) => {
		if (!eventKeys.includes(b.bet)) {
			eventKeys.push(b.bet);
		}
	});

	return eventKeys;
};

export const getCompetitionList = (dataArray = []) => {
	const competitionKeys = [];

	// eslint-disable-next-line
	dataArray.map((b) => {
		if (b.competition && !competitionKeys.includes(b.competition)) {
			competitionKeys.push(b.competition);
		}
	});

	return competitionKeys;
};
