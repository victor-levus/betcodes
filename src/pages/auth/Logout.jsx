import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleNotLogout = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");

    navigate("/");
  };

  return (
    <Flex justify="center" mt="9">
      <Box maxWidth="350px">
        <Card asChild>
          <Box>
            <Heading weight="bold" mb="9" className="text-center text-gray-400">
              Are you sure you want to Logout
            </Heading>
            <Flex justify="between">
              <Button onClick={handleNotLogout} color="gray">
                No
              </Button>
              <Button onClick={handleLogout} color="red">
                Yes
              </Button>
            </Flex>
          </Box>
        </Card>
      </Box>
    </Flex>
  );
};

export default Logout;
