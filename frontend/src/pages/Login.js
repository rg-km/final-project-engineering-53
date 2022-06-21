import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import BaseLayout from "../components/layouts/BaseLayout";

export default function Login() {
  return (
    <BaseLayout>
      <Heading mb={6}>Login</Heading>
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
        <form>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              // onChange={(e) => setEmail(e.target.value)}
              borderColor="gray.400"
              isRequired
            />

            <FormLabel htmlFor="password" mt={6}>
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              // onChange={(e) => setPassword(e.target.value)}
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
    </BaseLayout>
  );
}
