import { useState } from "react";
// import axios from "axios";
import axios from "../api/axios";
import {
  FormControl,
  FormLabel,
  Box,
  Container,
  Flex,
  Input,
  Heading,
  Button,
  Center,
} from "@chakra-ui/react";

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
          withCredentials: true,
        }
      );
      console.log(response.data);
      //
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box as="section" bgColor="gray.400">
        <Container maxW="container.xl" h="90vh" color="#1a202c">
          <Flex w="full" h="full" direction="column" justify="center" align="center">
            <Heading mb={6}>Register</Heading>
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

                  <FormLabel htmlFor="username" mt={6}>
                    Username
                  </FormLabel>
                  <Input
                    id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
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
          </Flex>
        </Container>
      </Box>
    </>
  );
}
