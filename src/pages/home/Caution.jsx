import React from "react";
import { Box, Card, Text } from "@radix-ui/themes";

const Caution = () => {
	return (
		<Box className="bg--2 p-3 py-4 rounded-md">
			<Text mb={"3"} as="p" className="text-base text-zinc-500">
				We provide odds daily that has high possibility of happening!!.
			</Text>
			<Text className="text-base text-zinc-500" as="p">
				Its absolutely free, Stake only what you can afford to lose
			</Text>
		</Box>
	);
};

export default Caution;
