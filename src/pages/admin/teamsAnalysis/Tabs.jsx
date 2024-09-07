import React from "react";
import { SquareIcon } from "@radix-ui/react-icons";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Badge, Box, Flex, Heading, Tabs, Text } from "@radix-ui/themes";

import Charts from "../../../components/Charts";

const AppTabs = ({ allBets, success, lost, in_Progress, teamName }) => {
  return (
    <Tabs.Root defaultValue="summary">
      <Box pt="1">
        <Tabs.Content value="summary" className="">
          <Text>
            <Box mb={"4"}>
              <Box>
                <Flex gap="2" align={"center"} wrap={"wrap"}>
                  <Badge size={"1"}>
                    <Flex
                      className="w-30"
                      height={"8"}
                      align={"center"}
                      gap={"3"}
                    >
                      <Box>
                        <Text size={"1"} mb={"3"}>
                          All Bets
                        </Text>
                        <Heading size={"4"}>{allBets?.length}</Heading>
                      </Box>
                      <SquareIcon className="text-lg" />
                    </Flex>
                  </Badge>

                  <Badge size={"1"} color="green">
                    <Flex
                      className="w-100"
                      height={"8"}
                      align={"center"}
                      gap={"3"}
                    >
                      <Box>
                        <Text size={"1"} mb={"3"}>
                          Success
                        </Text>
                        <Heading size={"4"}>{success?.length}</Heading>
                      </Box>
                      <FaCheck className="text-green-500 text-lg" />
                    </Flex>
                  </Badge>

                  <Badge size={"1"} color="red">
                    <Flex
                      className="w-30"
                      height={"8"}
                      align={"center"}
                      gap={"3"}
                    >
                      <Box>
                        <Text size={"1"} mb={"3"}>
                          Lost
                        </Text>
                        <Heading size={"4"}>{lost?.length}</Heading>
                      </Box>
                      <FaTimes className="text-red-500 text-lg" />
                    </Flex>
                  </Badge>
                </Flex>
              </Box>
            </Box>
          </Text>

          <Text size={"2"}>
            <div style={{ display: "flex", alignItems: "end" }}>
              <div style={{ position: "relative", minWidth: "308px" }}>
                <Charts
                  inProgress={in_Progress?.length}
                  lost={lost?.length}
                  success={success?.length}
                  teamName={teamName}
                />
              </div>
            </div>
          </Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
};

export default AppTabs;
