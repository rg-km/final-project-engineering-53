import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export const AdminCard = ({ children, title, width, overflowY }) => {
  return (
    <>
      <Heading mb={6}>{title}</Heading>
      <Box
        w={width ? width : "840px"}
        minH="640px"
        h="fit-content"
        maxH="75vh"
        border="1px solid"
        borderColor="gray.200"
        bgColor="#f8f7fc"
        borderRadius={8}
        boxShadow="lg"
        p={12}
        overflowY={overflowY ? overflowY : "hidden"}
      >
        {children}
      </Box>
    </>
  );
};
