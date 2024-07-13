import React from "react";
import { Box } from "@radix-ui/themes";

const PieChartApp = ({ success, inProgress, lost, teamName }) => {
  const data = [
    { label: "Success", value: success, color: "green" },
    { label: "In Progress", value: inProgress, color: "gray" },
    { label: "Lost", value: lost, color: "red" },
  ];

  return <Box></Box>;
};

export default PieChartApp;
