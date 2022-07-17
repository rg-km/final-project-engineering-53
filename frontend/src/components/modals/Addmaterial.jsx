/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "../../api/axiosGO";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const API_URL = "/admin/materials";

export const AddMaterial = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    header: "",
    sub_header: "",
    image: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const SetFormData = new FormData();
      SetFormData.append("header", form.header);
      SetFormData.append("sub_header", form.sub_header);
      SetFormData.append("image", form.image);
      SetFormData.append("content", form.content);

      await axios.post(API_URL, SetFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // clear form after submit?
      setForm({
        header: "",
        sub_header: "",
        image: "",
        content: "",
      });

      navigate("/admin/dashboard", { replace: true });
      toast({
        title: "Success!",
        description: "New material added successfully.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      //
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add New Material
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitForm}>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  onChange={handleTitle}
                  value={form.header}
                  borderColor="gray.400"
                />

                <FormLabel htmlFor="description" mt={6}>
                  Description
                </FormLabel>
                <Textarea
                  id="description"
                  onChange={handleDescription}
                  value={form.sub_header}
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
                <Textarea
                  id="content"
                  onChange={handleContent}
                  value={form.content}
                  borderColor="gray.400"
                />

                <HStack w="full" justify="end" spacing={4}>
                  <Button
                    my={8}
                    colorScheme="teal"
                    type="submit"
                    isLoading={loading ? true : false}
                  >
                    Submit
                  </Button>

                  <Button onClick={onClose}>Close</Button>
                </HStack>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
