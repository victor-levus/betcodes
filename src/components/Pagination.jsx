import React from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const Pagination = ({ currentPage, itemCount, pageSize }) => {
  const router = useNavigate();
  const [searchParams] = useSearchParams();

  const numberOfPage = Math.ceil(itemCount / pageSize);

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router("?" + params.toString());
  };

  if (numberOfPage <= 1) return null;

  return (
    <Flex align={"center"} gap={"2"}>
      <Text>
        Page {currentPage} of {numberOfPage}{" "}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <AiOutlineDoubleLeft />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <AiOutlineLeft />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === numberOfPage}
        onClick={() => changePage(currentPage + 1)}
      >
        <AiOutlineRight />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === numberOfPage}
        onClick={() => changePage(numberOfPage)}
      >
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
