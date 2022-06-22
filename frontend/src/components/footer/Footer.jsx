import {
  Box,
  Container,
  Heading,
  Button,
  Spacer,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Box as="footer" width="full" bgColor="#f8f7fc">
        <Container maxW="container.xl">
          <Divider borderColor="gray.300" />

          <Stack direction="row" minH="280px" height="full" py={16}>
            <Box width="50%">
              <Heading fontSize="xl">Future Map</Heading>
              <Stack direction="row" marginTop={5}>
                <Button label={"Instagram"} href="#">
                  <FaInstagram />
                </Button>
                <Button label={"LinkedIn"} href="#">
                  <FaLinkedin />
                </Button>
              </Stack>
            </Box>
            <Spacer />
            <Box width="25%">
              <Text fontSize="xl">About Us</Text>
              <Text fontSize="xl">Office</Text>
              <Text fontSize="sm" marginTop={5}>
                Final Project
              </Text>
              <Text fontSize="sm">Ruang Guru CAMP</Text>
              <Text fontSize="sm">Kampus Merdeka</Text>
              <Text fontSize="sm">2022</Text>
            </Box>
            <Box width="25%">
              <Text fontSize="xl">Contact Person</Text>
              <Text fontSize="sm" marginTop={5}>
                +61 85123456780
              </Text>
              <Text fontSize="sm">futuremap@gmail.com</Text>
              <Text fontSize="xl" marginTop={5}>
                FAQ
              </Text>
            </Box>
          </Stack>
        </Container>
        <Stack height={16} bgColor="#2477FF" justify="center">
          <Text align="center" color="white">
            Copyright Future Map 2022
          </Text>
        </Stack>
      </Box>
    </>
  );
}
