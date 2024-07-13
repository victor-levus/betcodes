import { Flex, Spinner } from "@radix-ui/themes";
import React from "react";

const AppSpinner = ({ size = 3 }) => {
  return (
    <Flex justify="center">
      <Spinner size={size} />
    </Flex>
  );
};

export default AppSpinner;
