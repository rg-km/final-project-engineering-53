import { useState } from "react";
import axios from "../../api/axiosGO";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../../components/layouts/BaseLayout";

const LOGIN_URL = "/login";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/profile"; // redirect admin to profile

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            Authorization: `Bearer Token`,
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      const accessToken = response?.data?.token;

      // set admin token and role in local storage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", "admin");

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
    <BaseLayout bgColor="gray.300">
      <Heading mb={6}>Login Admin</Heading>
      <Box
        w="640px"
        h="fit-content"
        border="1px solid"
        borderColor="gray.200"
        bgColor="#f8f7fc"
        borderRadius={8}
        boxShadow="lg"
        p={12}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              borderColor="gray.400"
              isRequired
            />

            <FormLabel htmlFor="password" mt={6}>
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              borderColor="gray.400"
              isRequired
            />

            <Center>
              <Button mt={12} colorScheme="teal" type="submit">
                Submit
              </Button>
            </Center>
          </FormControl>
        </form>
      </Box>

      <Text mt={6}>
        <ChakraLink
          as={Link}
          to="/admin/register"
          fontWeight="semibold"
          textDecor="underline"
        >
          Register
        </ChakraLink>{" "}
        as an Administrator
      </Text>
    </BaseLayout>
  );
}
