import { Badge, Box, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

const CardUI = ({ id, imageUrl, name, description, price }) => {
  return (
    <Box
      position="relative"
      width="300px"
      p="2"
      className="bg-white shadow-md shadow-gray-400 rounded-lg"
    >
      <Flex direction="column" mb="4">
        <img
          src={imageUrl}
          alt="Bold typography"
          style={{
            display: "block",
            objectFit: "contain",
            width: "100%",
            height: "200px",
            backgroundColor: "#fff",
          }}
        />

        <Flex direction="column">
          {!price ? (
            <Text
              className="h-[40px]"
              as="div"
              size="5"
              weight="bold"
              mb="3"
              color=""
            >
              {name}
            </Text>
          ) : (
            <Link to={`/products/${id}`}>
              <Text
                className="h-[40px]"
                as="div"
                size="5"
                weight="bold"
                mb="3"
                color=""
              >
                {name}
              </Text>
            </Link>
          )}
          <Text className="h-[45px]" as="p" size="3" color="gray">
            {description}
          </Text>
        </Flex>
      </Flex>

      {price && (
        <Box>
          <Flex width="280px" justify="between" align="center">
            <Badge size="3" color="violet">
              N{price.toLocaleString()}
            </Badge>
            <Button className="" size="2" variant="solid" color="red">
              Add to Cart
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CardUI;
