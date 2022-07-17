/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "../../api/axiosGO";
import { Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import BaseLayout from "../../components/layouts/BaseLayout";
import { AdminCard } from "../../components/cards/AdminCard";
import useAuth from "../../hooks/useAuth";

const API_URL = "/admin/user";

export default function AdminProfile() {
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

      // console.log(response?.data);

      const username = response?.data?.data?.username;
      const email = response?.data?.data?.email;
      const role = response?.data?.data?.role;

      setAuth({ username, email, role });
      //
    } catch (error) {
      alert("Unauthorized. Please login as admin!");
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoggedInUser();
  }, []);

  return (
    <BaseLayout bgColor="gray.300">
      <AdminCard title="Admin Profile">
        <Heading as="h3" fontSize="2xl" pb={5}>
          Information
        </Heading>

        {success ? (
          <UnorderedList display="table">
            <ListItem>Username: {user.data.username}</ListItem>
            <ListItem>Email: {user.data.email}</ListItem>
            <ListItem>Role: {user.data.role}</ListItem>
          </UnorderedList>
        ) : (
          <Text>No User Found</Text>
        )}
      </AdminCard>
    </BaseLayout>
  );
}
