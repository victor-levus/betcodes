import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import _ from "lodash";
import moment from "moment-timezone";

import AppTabs from "./Tabs";
import LatestBet from "../LatestBets";
import BetCard from "../../home/BetCard";

const SearchField = ({ betsData }) => {
  const ref = useRef(null);
  const [betsDataList, setBetsDataList] = useState("");
  const [betPageCount, setBetPageCount] = useState(0);
  const [counter, setCounter] = useState(0);
  const [search, setSearch] = useState();
  const [searchDisplay, setSearchDisplay] = useState("hidden");
  const [teamList, setTeamList] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);
  const [winningFormData, setWinningFormData] = useState(null);

  useEffect(() => {
    initializeTeamsInfo();
  }, []);

  const initializeTeamsInfo = () => {
    const prevTeam = localStorage.getItem("teamName");
    const teamKeys = [];

    betsData.map((b) => {
      if (!teamKeys.includes(b.home_team)) {
        teamKeys.push(b.home_team);
      }

      if (!teamKeys.includes(b.away_team)) {
        teamKeys.push(b.away_team);
      }
    });

    setTeams(teamKeys);

    if (prevTeam) {
      setTeamName(prevTeam);
      return;
    }

    setTeamName(teamKeys[0]);
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

  const handleBetsClick = (type) => {
    if (type === "plus") {
      const pageShift = betPageCount + 5;
      const newBetsData = allBets.slice(pageShift, pageShift + 5);
      setBetsDataList(newBetsData);
      setBetPageCount(pageShift);
      setCounter(counter + 1);
      return;
    }

    if (type === "minus") {
      const pageShift = betPageCount - 5;
      const newBetsData = allBets.slice(pageShift, pageShift + 5);
      setBetsDataList(newBetsData);
      setBetPageCount(pageShift);
      setCounter(counter - 1);
      return;
    }

    setBetsDataList(allBets);
    setBetPageCount(0);
  };

  const paginationSize =
    allBets.length % 5 > 0
      ? Math.floor(allBets.length / 5) + 1
      : Math.floor(allBets.length / 5);

  return (
    <>
      {winningFormData && (
        <Flex
          justify="center"
          align="center"
          className={`${
            winningFormData.bet_status === "SUCCESS"
              ? "bg-green-800"
              : winningFormData.bet_status === "LOST"
              ? "bg-red-800"
              : ""
          } bg-opacity-10 absolute top-0 bottom-0 right-0 left-0 z-10`}
        >
          <Box
            className={`${
              winningFormData.bet_status === "SUCCESS"
                ? "bg-emerald-950"
                : winningFormData.bet_status === "LOST"
                ? "bg-pink-950"
                : ""
            } bg-opacity-90 w-[650px] h-[550px]  relative px-5`}
          >
            <Button
              variant="soft"
              color={
                winningFormData.bet_status === "SUCCESS"
                  ? "green"
                  : winningFormData.bet_status === "LOST"
                  ? "red"
                  : ""
              }
              onClick={() => setWinningFormData(null)}
              className="absolute right-1 bottom-1"
            >
              Close
            </Button>

            <Flex
              gap="4"
              justify="between"
              mt="9"
              mb="4"
              className={
                winningFormData.bet_status === "SUCCESS"
                  ? "bg-teal-900 py-2 rounded"
                  : winningFormData.bet_status === "LOST"
                  ? "bg-pink-900 py-2 rounded"
                  : ""
              }
            >
              <Heading size="6" className="text-right text-2xl w-[48%]">
                {winningFormData.home_team}
              </Heading>

              <Heading size="6" className="text-center text-lg w-[4%]">
                vs
              </Heading>

              <Heading size="6" className="text-left text-2xl w-[48%]">
                {winningFormData.away_team}
              </Heading>
            </Flex>

            {/* <hr className="mb-3" /> */}

            <Flex
              direction="column"
              gap="3"
              className="text-[var(--accent-9)] text-center "
            >
              <Flex justify="center" gap="3">
                <Heading className="w-[50%] text-right" size="2">
                  Bet Status :
                </Heading>

                <Heading size="2" className="w-[50%] text-left text-gray-300">
                  {winningFormData.bet_status}
                </Heading>
              </Flex>

              <Flex justify="center" gap="3">
                <Heading className="w-[50%] text-right" size="2">
                  Bet Event :
                </Heading>

                <Heading size="2" className="w-[50%] text-left text-gray-300">
                  {winningFormData.bet}
                </Heading>
              </Flex>

              <Flex justify="center" gap="3">
                <Heading className="w-[50%] text-right" size="2">
                  Odd :
                </Heading>

                <Heading size="2" className="w-[50%] text-left text-gray-300">
                  {winningFormData.odd}
                </Heading>
              </Flex>

              <Flex justify="center" gap="3">
                <Heading className="w-[50%] text-right" size="2">
                  Half Time Scores :
                </Heading>

                <Heading size="2" className="w-[50%] text-left text-gray-300">
                  {winningFormData.ht_home_score} :{" "}
                  {winningFormData.ht_away_score}
                </Heading>
              </Flex>

              <Flex justify="center" gap="3">
                <Heading className="w-[50%] text-right" size="2">
                  Full Time Scores :
                </Heading>

                <Heading size="2" className="w-[50%] text-left text-gray-300">
                  {winningFormData.ft_home_score} :{" "}
                  {winningFormData.ft_away_score}
                </Heading>
              </Flex>

              <Flex justify="center" gap="3">
                <Heading className="w-[50%] text-right" size="2">
                  Match Date :
                </Heading>

                <Heading size="2" className="w-[50%] text-left text-gray-300">
                  {moment(winningFormData.match_time).format("DD MMM YYYY")},{" "}
                  {""}
                  {moment
                    .tz(winningFormData.match_time, "Africa/Lagos")
                    .format("HH:mm")}
                </Heading>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      )}

      <Flex
        direction="column-reverse"
        gap={"2"}
        justify={"between"}
        className="md:flex-row md:items-center"
      >
        <Heading color="gray" mb={"4"}>
          {teamName}
        </Heading>

        <Box className="flex-grow max-w-[500px] mb-4 md:mb-0">
          <TextField.Root
            size={"3"}
            variant="soft"
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
            onFocus={(e) => {
              setSearchDisplay("");
              e.target.select();
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
                  setBetsDataList("");
                  setBetPageCount(0);
                  setCounter(0);
                  localStorage.setItem("teamName", tl);
                }}
              >
                {" "}
                {tl}
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>

      <hr className="mb-3" />

      {teamName && (
        <Box my={"5"}>
          <Box className="mb-10">
            <Heading size="3" mb="2" color="gold">
              Winning Form
            </Heading>

            <Flex gap="1" mb="6" wrap="wrap">
              {allBets.map((b) => (
                <Flex key={b.id} direction="column">
                  <Box
                    className="cursor-pointer"
                    onClick={() => setWinningFormData(b)}
                  >
                    {b.bet_status === "SUCCESS" ? (
                      <Text className="bg-green-500 px-2 text-black rounded-sm ">
                        S
                      </Text>
                    ) : b.bet_status === "LOST" ? (
                      <Text className="bg-red-500 px-2 text-black rounded-sm ">
                        L
                      </Text>
                    ) : null}
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Box>

          <div className="w-full flex flex-col md:flex-row md:justify-between flex-grow gap-8">
            <div className="flex-grow max-w-[700px]">
              <Heading mb="4">Bet List Info</Heading>

              <div className="md:h-[430px] mb-2 md:mb-0 flex flex-col gap-2">
                {betsDataList
                  ? betsDataList
                      .slice(0, 5)
                      .map((betData) => <BetCard betData={betData} />)
                  : allBets
                      .slice(0, 5)
                      .map((betData) => <BetCard betData={betData} />)}
              </div>

              {paginationSize > 1 && (
                <div className="text-right gap-2">
                  <button
                    disabled={!betPageCount}
                    onClick={() => handleBetsClick("minus")}
                    className={`px-3 py-1 ${
                      !betPageCount
                        ? "bg-slate-900 rounded text-gray-600"
                        : "bg-slate-800 rounded"
                    }`}
                  >
                    <MdOutlineKeyboardArrowLeft size="25" />
                  </button>
                  <button
                    disabled={counter === paginationSize - 1}
                    onClick={() => handleBetsClick("plus")}
                    className={`px-3 py-1 ml-2 ${
                      counter === paginationSize - 1
                        ? "bg-slate-900 rounded text-gray-600"
                        : "bg-slate-800 rounded"
                    }`}
                  >
                    <MdOutlineKeyboardArrowRight size="25" />
                  </button>
                </div>
              )}
            </div>

            <div className=" flex items-start md:ml-10 mt-11">
              <AppTabs
                allBets={allBets}
                in_Progress={inProgress}
                lost={lost}
                success={success}
                teamName={teamName}
              />
            </div>
          </div>
        </Box>
      )}
    </>
  );
};

export default SearchField;
