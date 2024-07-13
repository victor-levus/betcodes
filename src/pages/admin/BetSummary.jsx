import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

const BetSummary = ({ success, inProgress, lost }) => {
  const statusData = [
    { label: "Success Bets", value: success, status: "SUCCESS" },
    { label: "In-Progress Bets", value: inProgress, status: "IN_PROGRESS" },
    { label: "Lost Bets", value: lost, status: "LOST" },
  ];

  return (
    <Box>
      <Heading mb={"5"}>Bet status</Heading>

      <Flex gap={"3"} mb={"3"}>
        {statusData.map((data) => (
          <Link
            className="nav--link"
            key={data.status}
            to={`/dashboard/bets?status=${data.status}`}
          >
            <Card>
              <Flex direction={"column"} gap={"3"}>
                <Text className="text-sm font-medium"> {data.label}</Text>

                <Text size={"8"} className="font-bold">
                  {data.value}
                </Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default BetSummary;
