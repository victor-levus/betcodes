import { Flex, Spinner } from "@radix-ui/themes";
import React from "react";

const AppSpinner = ({ mt, size = 3 }) => {
  return (
    <Flex mt={mt} justify="center">
      <Spinner size={size} />
    </Flex>
  );
};

export default AppSpinner;
