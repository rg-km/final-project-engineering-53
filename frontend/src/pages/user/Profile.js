/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "../../api/axiosGO";
import { Avatar, Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import BaseLayout from "../../components/layouts/BaseLayout";
import useAuth from "../../hooks/useAuth";

const API_URL = "/client/user";

export default function Profile() {
  const { setAuth } = useAuth();

  const [user, setUser] = useState({});
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");

  const handleLoggedInUser = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setUser(response?.data);

      const username = response?.data?.data?.username;
      const email = response?.data?.data?.email;
      const role = response?.data?.data?.role;

      setAuth({ username, email, role });
      //
    } catch (error) {
      alert("Unauthorized. Please login first!");
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoggedInUser();
  }, []);

  return (
    <BaseLayout bgColor="#f8f7fc" justify="flex-start">
      <VStack w="full" spacing={16} pt={24}>
        <Center flexDir="column">
          {success ? (
            <>
              <Avatar
                size="2xl"
                name={user.data.username}
                src="https://bit.ly/naruto-sage"
              />
              <Heading as="h2" fontSize="3xl" pt={6}>
                {user.data.username}
              </Heading>
              <Text fontSize="xl" opacity={0.8} pt={3}>
                Student
              </Text>
            </>
          ) : (
            <Text>No User Found</Text>
          )}
        </Center>

        <Box w="full" textAlign="left">
          <Heading as="h3" fontSize="2xl">
            My History
          </Heading>
        </Box>
      </VStack>
    </BaseLayout>
  );
}
