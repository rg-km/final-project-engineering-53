/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
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

const API_URL = "/admin/materials/";

export const EditMaterial = ({ id, title, description, content }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = localStorage.getItem("token");

  const put_header = useRef(null);
  const put_sub_header = useRef(null);
  const put_image = useRef(null);
  const put_content = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleEditData = async () => {
    setLoading(true);
    try {
      const SetEditData = {
        header: put_header.current.value,
        sub_header: put_sub_header.current.value,
        image: put_image.current.value,
        content: put_content.current.value,
      };

      const data = await axios.put(API_URL + id, SetEditData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);

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

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} mr={2}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={6}>
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                ref={put_header}
                defaultValue={title}
                borderColor="gray.400"
              />

              <FormLabel htmlFor="description" mt={6}>
                Description
              </FormLabel>
              <Textarea
                id="description"
                ref={put_sub_header}
                defaultValue={description}
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
                ref={put_image}
                borderColor="gray.400"
              />

              <FormLabel htmlFor="content" mt={6}>
                Content
              </FormLabel>
              <Textarea
                id="content"
                ref={put_content}
                defaultValue={content}
                borderColor="gray.400"
              />

              <HStack w="full" justify="end" spacing={4}>
                <Button
                  my={8}
                  colorScheme="teal"
                  isLoading={loading ? true : false}
                  onClick={handleEditData}
                >
                  Submit
                </Button>

                <Button onClick={onClose}>Close</Button>
              </HStack>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
