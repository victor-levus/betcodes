import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const ToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        className="w-40 bg-slate-800 px-2 py-3 opacity-90"
        style={{ minWidth: "10rem" }}
      >
        <Text
          as="div"
          className="label mb-2 text-neutral-50 text-lg"
        >{`${label}`}</Text>
        <Flex direction="column">
          <Text className="label text--accent">{`Bets: ${payload[0]?.value}`}</Text>
          <Text className="label text-green-600">{`Wins: ${payload[1]?.value}`}</Text>
          <Text
            className="label"
            style={{ color: "red" }}
          >{`Lost: ${payload[2]?.value}`}</Text>
        </Flex>
      </Box>
    );
  }

  return null;
};

const TeamStatistic = ({ bets }) => {
  const [teams, setTeams] = useState([]);

  const getTeamStas = (teamName) => {
    const teamBets = bets?.filter(
      (b) => b.home_team === teamName || b.away_team === teamName
    );

    const teamBetWins = teamBets?.filter((tb) => tb.bet_status === "SUCCESS");
    const teamBetLost = teamBets?.filter((tb) => tb.bet_status === "LOST");

    return {
      name: teamName,
      bets: teamBets.length,
      wins: teamBetWins.length,
      lost: teamBetLost.length,
    };
  };

  useEffect(() => {
    teamKeyArray();
  }, []);

  const teamKeyArray = () => {
    const teamKeys = [];

    bets.map((b) =>
      teamKeys.includes(b.home_team) || teamKeys.includes(b.away_team)
        ? null
        : teamKeys.push(b.home_team, b.away_team)
    );

    setTeams(teamKeys);
  };

  const data = () => {
    return teams.map((t) => getTeamStas(t));
  };

  return (
    <Box
      mt="9"
      width={{ initial: "100%", md: "100%" }}
      style={{ overflow: "hidden" }}
      className="team-stats"
    >
      <Heading as="h1">TeamStatistics</Heading>

      <ResponsiveContainer width={"100%"} height={500}>
        <BarChart
          data={data()
            .sort((a, b) => b.wins - a.wins)
            .slice(0, 20)}
          margin={{ top: 30, right: 0, left: -40, bottom: 10 }}
        >
          <XAxis dataKey="name" angle={295} height={120} overflow={"auto"} />
          <YAxis padding={{ top: 10 }} />
          <Tooltip content={<ToolTip />} />
          <Legend />
          <Bar dataKey="bets" fill="var(--accent-9)" fillOpacity={0.8} />
          <Bar dataKey="wins" fill="green" fillOpacity={0.8} />
          <Bar dataKey="lost" fill="#5c0512" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={"100%"} height={550} className="mt-10">
        <AreaChart
          width={730}
          height={250}
          data={data()
            .sort((a, b) => b.wins - a.wins)
            .slice(0, 20)}
          margin={{ top: 30, right: 0, left: -40, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" angle={280} height={120} overflow={"auto"} />
          <YAxis padding={{ top: 10 }} />
          <Tooltip content={<ToolTip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="bets"
            stroke="var(--accent-9)"
            fillOpacity={0.6}
            fill="var(--accent-9)"
          />
          <Area
            type="monotone"
            dataKey="wins"
            stroke="green"
            fillOpacity={0.7}
            fill="green"
          />
          <Area
            type="monotone"
            dataKey="lost"
            stroke="#5c0512"
            fillOpacity={0.7}
            fill="#5c0512"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TeamStatistic;
