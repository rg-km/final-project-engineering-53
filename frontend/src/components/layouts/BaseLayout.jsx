import { Box, Container, Flex } from "@chakra-ui/react";

export default function BaseLayout({ children }) {
  return (
    <Box
      as="section"
      width="full"
      position="absolute"
      top={0}
      zIndex={-1}
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
