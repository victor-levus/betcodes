import { Box, Card, Heading } from "@radix-ui/themes";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const BetChart = ({ success, inProgress, lost }) => {
  const data = [
    { label: "Success", value: success, color: "green" },
    { label: "In Progress", value: inProgress, color: "gray" },
    { label: "Lost", value: lost, color: "red" },
  ];

  return (
    <Box>
      <Heading mb={"5"}>Bet Graph</Heading>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Bar
            dataKey={"value"}
            barSize={60}
            fill={"var(--accent-9)"}
            fillOpacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BetChart;
