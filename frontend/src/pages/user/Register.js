import { useState } from "react";
import axios from "../../api/axiosGO";
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
import AuthLayout from "../../components/layouts/AuthLayout";

const REGISTER_URL = "/register";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, password, username }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(response.data);
      alert("Success");
      setEmail("");
      setPassword("");
      setUsername("");
      //
    } catch (error) {
      console.log(error);
    }
  };

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
        <form onSubmit={handleSubmit}>
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
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
