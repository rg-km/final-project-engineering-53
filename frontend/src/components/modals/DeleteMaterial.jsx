/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "../../api/axiosGO";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const API_URL = "/admin/materials/";

export const DeleteMaterial = ({ id, title }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = localStorage.getItem("token");

  const handleDeleteMaterial = async () => {
    try {
      await axios.delete(API_URL + id, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/admin/dashboard", { replace: true });
      toast({
        title: "Success!",
        description: "Material deleted successfully.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      //
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="outline" colorScheme="red" onClick={onOpen}>
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Delete <b>{title}</b> from Materials?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleDeleteMaterial();
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
