import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, TextField } from "@radix-ui/themes";
import _ from "lodash";
import AppTabs from "./Tabs";

const SearchField = ({ betsData }) => {
  const ref = useRef(null);
  const [searchDisplay, setSearchDisplay] = useState("hidden");
  const [teamList, setTeamList] = useState([]);
  const [search, setSearch] = useState();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    teamKeyArray();
  }, []);

  const teamKeyArray = () => {
    const teamKeys = [];

    betsData.map((b) =>
      teamKeys.includes(b.home_team) || teamKeys.includes(b.away_team)
        ? null
        : teamKeys.push(b.home_team, b.away_team)
    );

    setTeams(teamKeys);
  };

  const allBets = _.filter(betsData, function (a) {
    return a.home_team === teamName || a.away_team === teamName;
  });

  const lost = _.filter(betsData, function (a) {
    return (
      (a.home_team === teamName || a.away_team === teamName) &&
      a.bet_status === "LOST"
    );
  });

  const success = _.filter(betsData, function (a) {
    return (
      (a.home_team === teamName || a.away_team === teamName) &&
      a.bet_status === "SUCCESS"
    );
  });

  const inProgress = _.filter(betsData, function (a) {
    return (
      (a.home_team === teamName || a.away_team === teamName) &&
      a.bet_status === "IN_PROGRESS"
    );
  });

  console.log(search);

  return (
    <>
      <Flex gap={"1"}>
        <TextField.Root
          size={"3"}
          variant="soft"
          className="w-[100%]"
          ref={ref}
          id="searchInput"
          placeholder="Search for Team…"
          autoComplete="off"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            const newList = _.filter(teams, function (a) {
              return a.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setTeamList(newList);
          }}
          onFocus={() => {
            setSearchDisplay("");
            return;
          }}
          onBlur={() => {
            setSearchDisplay("hidden");
            return;
          }}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {/* <Flex
          align={"center"}
          justify={"center"}
          className="bg-green-300 border-0 rounded-sm cursor-pointer"
          width={"6"}
        >
          <PaperPlaneIcon color="green" height="16" width="16" />
        </Flex> */}
      </Flex>

      <Box
        className={`max-w-xs bg-slate-500 w-44 max-h-52 overflow-y-scroll no-scrollbar absolute z-10 ${
          !search ? "hidden" : searchDisplay
        }`}
      >
        {teamList.map((tl, i) => (
          <Box
            key={i}
            className="text-gray-100 bg-slate-600 hover:bg-slate-700 p-2 cursor-pointer"
            onMouseDown={() => {
              setSearch(tl);
              setTeamName(tl);
            }}
          >
            {" "}
            {tl}
          </Box>
        ))}
      </Box>

      {teamName && (
        <Box my={"5"}>
          <Flex gap={"2"} align={"end"} justify={"between"} mb={"7"}>
            <Heading color="gray" mb={"4"}>
              {teamName}
            </Heading>

            {/* <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1010px-FC_Barcelona_%28crest%29.svg.png"
              width={"50px"}
              alt=""
            /> */}
          </Flex>

          <AppTabs
            allBets={allBets}
            in_Progress={inProgress}
            lost={lost}
            success={success}
            teamName={teamName}
          />
        </Box>
      )}
    </>
  );
};

export default SearchField;
