import { useState } from "react";
import axios from "../../api/axiosGO";

import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../../components/layouts/BaseLayout";
import { AdminCard } from "../../components/cards/AdminCard";

const LOGIN_URL = "/login";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard"; // redirect admin to dashboard

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
      <AdminCard title="Admin Login">
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
      </AdminCard>

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
