/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import axios from "../../api/axiosGO";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import BaseLayout from "../../components/layouts/BaseLayout";
import { AdminCard } from "../../components/cards/AdminCard";

const API_URL = "/admin/materials";

export default function AdminMaterials() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    header: "",
    sub_header: "",
    image: "",
    content: "",
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const SetFormData = new FormData();
      SetFormData.append("header", form.header);
      SetFormData.append("sub_header", form.sub_header);
      SetFormData.append("image", form.image);
      SetFormData.append("content", form.content);

      await axios.post(API_URL, SetFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitle = (e) => {
    setForm({ ...form, header: e.target.value });
  };

  const handleDescription = (e) => {
    setForm({ ...form, sub_header: e.target.value });
  };

  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleContent = (e) => {
    setForm({ ...form, content: e.target.value });
  };

  return (
    <BaseLayout bgColor="gray.300">
      <AdminCard title="Materials">
        <Heading as="h3" fontSize="2xl" pb={5}>
          Admin Materials
        </Heading>

        <form onSubmit={handleSubmitForm}>
          <FormControl isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              type="text"
              onChange={handleTitle}
              borderColor="gray.400"
            />

            <FormLabel htmlFor="description" mt={6}>
              Description
            </FormLabel>
            <Input
              id="description"
              type="text"
              onChange={handleDescription}
              borderColor="gray.400"
            />

            <FormLabel htmlFor="image" mt={6}>
              Cover Image
            </FormLabel>
            <Input
              id="image"
              type="file"
              accept="image/png, image/jpg, image/gif"
              pt={1}
              onChange={handleImage}
              borderColor="gray.400"
            />

            <FormLabel htmlFor="content" mt={6}>
              Content
            </FormLabel>
            <Input
              id="content"
              type="text"
              onChange={handleContent}
              borderColor="gray.400"
            />

            <Center>
              <Button mt={12} colorScheme="teal" type="submit">
                Add New Material
              </Button>
            </Center>
          </FormControl>
        </form>
      </AdminCard>
    </BaseLayout>
  );
}
