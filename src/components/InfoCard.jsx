import React from "react";
import { Box, Card, Text } from "@radix-ui/themes";

const InfoCard = ({ info, subInfo }) => {
  return (
    <Box width={"100%"}>
      <Card className="p-6" asChild>
        <Box>
          {info && (
            <Text as="div" size="5" weight="bold" mb="3">
              {info}
            </Text>
          )}
          {subInfo && (
            <Text as="div" color="gray" size="3">
              {subInfo}
            </Text>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default InfoCard;
