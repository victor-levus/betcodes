import React from "react";
import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children }) => {
  if (!children) return null;

  return (
    <Text color="red" as="p" size={"1"}>
      {children}
    </Text>
  );
};

export default ErrorMessage;
