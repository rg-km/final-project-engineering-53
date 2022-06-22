import { Box, Container, Flex } from "@chakra-ui/react";

export default function AuthLayout({ children }) {
  return (
    <Box
      as="section"
      width="full"
      bgImage="url('/img/bg-hero-map.png')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgColor="gray.400"
    >
      <Container maxW="container.xl" h="100vh" color="#1a202c">
        <Flex
          w="full"
          h="full"
          direction="column"
          justify="center"
          align="center"
        >
          {children}
        </Flex>
      </Container>
    </Box>
  );
}
