import { Box, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { Link, useParams } from "react-router-dom";

const DashboardHeader = () => {
  const path = useParams()["*"];

  return (
    <Box className="pb-3 pt-2">
      <Flex gap="2" wrap={"wrap"}>
        <Link className="nav--link2" to="/dashboard">
          <Button
            className="p-3"
            variant="outline"
            color={path === "dashboard" ? "orange" : "gray"}
          >
            Dashboard
          </Button>
        </Link>

        <Link className="nav--link2" to="/dashboard/bets">
          <Button
            className="p-3"
            variant="outline"
            color={path === "dashboard/bets" ? "orange" : "gray"}
          >
            Bet List
          </Button>
        </Link>

        <Link className="nav--link2" to="/dashboard/teamanalysis">
          <Button
            className="p-3"
            variant="outline"
            color={path === "dashboard/teamanalysis" ? "orange" : "gray"}
          >
            Team Analysis
          </Button>
        </Link>

        <Link className="nav--link2" to="/dashboard/users">
          <Button
            className="p-3"
            variant="outline"
            color={path === "dashboard/users" ? "orange" : "gray"}
          >
            User List
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
