import { Link } from "react-router-dom";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import BtnPrimary from "../buttons/BtnPrimary";
import useAuth from "../../hooks/useAuth";

export default function HomeCTA() {
  const { auth } = useAuth();

  return (
    <>
      <Box
        as="section"
        id="register-now"
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

            {auth?.username ? (
              <Link to="/materials">
                <BtnPrimary
                  title="Go To Materials"
                  btnColor="white"
                  textColor="#2477FF"
                />
              </Link>
            ) : (
              <Link to="/register">
                <BtnPrimary
                  title="Register Now"
                  btnColor="white"
                  textColor="#2477FF"
                />
              </Link>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  );
}
