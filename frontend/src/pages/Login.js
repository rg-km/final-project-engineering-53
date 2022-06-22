import {
  Box,
  Button,
  Heading,
  Text,
  Input,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";

export default function Login() {
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
        mt={-4}
      >
        <form action="submit">
          <Stack spacing={3}>
            <Heading mb={6} color="black">
              Login
            </Heading>
            <FormControl isRequired>
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
              />
              <Text textAlign="right" textColor="gray" mt="5" mb={16}>
                <Button variant="link" isDisabled>
                  Lupa Password
                </Button>
              </Text>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              color="white"
              bgColor="#2477FF"
              size="md"
              borderRadius="50"
            >
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="outline"
              colorScheme="whiteAlpha"
              color="#2477FF"
              bgColor="white"
              size="md"
              borderRadius="50"
            >
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}
