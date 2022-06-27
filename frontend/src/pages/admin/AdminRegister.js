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
import { Link } from "react-router-dom";
import BaseLayout from "../../components/layouts/BaseLayout";

const REGISTER_URL = "/admin/register";

export default function AdminRegister() {
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
    <BaseLayout bgColor="gray.300">
      <Heading mb={6}>Register Admin</Heading>
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
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              borderColor="gray.400"
            />

            <FormLabel htmlFor="username" mt={6}>
              Username
            </FormLabel>
            <Input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              borderColor="gray.400"
            />

            <FormLabel htmlFor="password" mt={6}>
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              borderColor="gray.400"
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
          to="/admin/login"
          fontWeight="semibold"
          textDecor="underline"
        >
          Login
        </ChakraLink>{" "}
        as an Administrator
      </Text>
    </BaseLayout>
  );
}
