import React from "react";
import { Card, Text } from "@radix-ui/themes";

const Caution = () => {
  return (
    <Card>
      <Text mb={"3"} as="p" className="text-base text-zinc-500">
        We provide odds daily that has high possibility of happening!!.
      </Text>
      <Text className="text-base text-zinc-500" as="p">
        Its absolutely free, Stake only what you can afford to lose
      </Text>
    </Card>
  );
};

export default Caution;
