import React, { useEffect, useState } from "react";
import { Box } from "@radix-ui/themes";
import _ from "lodash";

const TextSuggestion = ({ type, dataList = [], search, setFieldValue }) => {
	const [searchDisplay, setSearchDisplay] = useState("");
	const [predictions, setPredictions] = useState("");

	useEffect(() => {
		if (searchDisplay === "hidden") {
			setPredictions("");
			setSearchDisplay("");
			return;
		}

		if (!dataList || dataList.length === 0) return;

		const newList = _.filter(dataList, function (a) {
			if (!a) return;
			return a.toLowerCase().includes(search?.toLowerCase());
		});

		setPredictions(newList);

		// eslint-disable-next-line
	}, [search]);

	return (
		<Box
			className={`max-w-xs bg-slate-500 w-44 max-h-52 overflow-y-scroll no-scrollbar absolute z-10 ${
				!predictions ? "hidden" : searchDisplay
			}`}
		>
			{predictions &&
				predictions.map((dl, i) => (
					<Box
						key={i}
						className="text-gray-100 bg-slate-600 hover:bg-slate-700 p-2 cursor-pointer"
						onMouseDown={() => {
							setSearchDisplay("hidden");
							setPredictions("");
							setFieldValue(type, dl);
						}}
					>
						{" "}
						{dl}
					</Box>
				))}
		</Box>
	);
};

export default TextSuggestion;
