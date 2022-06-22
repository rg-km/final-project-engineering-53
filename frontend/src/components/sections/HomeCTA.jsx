import React from "react";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import BtnPrimary from "../buttons/BtnPrimary";
import { Link } from "react-router-dom";

export default function HomeCTA() {
  return (
    <>
      <Box
        as="section"
        w="full"
        minH="600px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="gray.200"
      >
        <Container maxW="container.xl" height="full">
          <VStack
            width="full"
            height="360px"
            justify="center"
            color="white"
            bgColor="#2477FF"
            borderRadius={16}
            spacing={12}
          >
            <Heading as="h2" fontSize="40px">
              Ready to know your Future Map?
            </Heading>

            <Link to="/register">
              <BtnPrimary
                title="Register Now"
                btnColor="white"
                textColor="#2477FF"
              />
            </Link>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
