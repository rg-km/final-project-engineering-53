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
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";

const LOGIN_URL = "/login";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile"; // redirect user to profile

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      // console.log(response?.data);
      const accessToken = response?.data?.token;

      // set user token in local storage
      localStorage.setItem("token", accessToken);

      setEmail("");
      setPassword("");

      navigate(from, { replace: true });
      //
    } catch (error) {
      alert("User not found!");
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
