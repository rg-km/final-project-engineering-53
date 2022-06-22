import {
  Box,
  Button,
  Heading,
  Text,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";

export default function Register() {
  return (
    <AuthLayout>
      <Box
        minW="720px"
        minH="656px"
        h="fit-content"
        backgroundColor="white"
        alignItems="center"
        boxShadow="lg"
        borderRadius={16}
        p={16}
        mt={24}
      >
        <form action="submit">
          <Stack spacing={3}>
            <Heading mb={6} color="black">
              Register
            </Heading>
            <FormControl isRequired>
              <FormLabel type="username" textColor="black">
                Username:
              </FormLabel>
              <Input
                id="username"
                type="username"
                aria-label="username"
                borderRadius="50"
                mb="10"
                color="black"
              />
              <FormLabel type="email" textColor="black">
                Email:
              </FormLabel>
              <Input
                id="email"
                type="email"
                aria-label="email"
                borderRadius="50"
                mb="10"
                color="black"
              />
              <FormLabel type="password" textColor="black">
                Password:
              </FormLabel>
              <Input
                id="password"
                type="password"
                aria-label="password"
                borderRadius="50"
                color="black"
                mb={16}
              />
            </FormControl>
            <Button
              type="submit"
              color="white"
              bgColor="#2477FF"
              colorScheme="blue"
              size="md"
              borderRadius="50"
            >
              Register
            </Button>
            <Text textAlign="center" fontWeight="medium">
              Already have an account?{" "}
              <ChakraLink as={Link} to="/login" fontWeight="semibold">
                Login
              </ChakraLink>
            </Text>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}
