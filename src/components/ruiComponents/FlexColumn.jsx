import { Flex } from "@radix-ui/themes";

const FlexColumn = ({ children, ...props }) => {
  return (
    <Flex direction="column" {...props}>
      {children}
    </Flex>
  );
};

export default FlexColumn;
