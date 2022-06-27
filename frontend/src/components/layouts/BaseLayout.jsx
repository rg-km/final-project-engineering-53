import { Box, Container, Flex } from "@chakra-ui/react";

export default function BaseLayout({ children, bgColor, justify }) {
  return (
    <Box as="section" width="full" bgColor={bgColor}>
      <Container maxW="container.xl" h="100vh" color="#1a202c">
        <Flex
          w="full"
          h="full"
          direction="column"
          align="center"
          justify={justify ? justify : "center"}
        >
          {children}
        </Flex>
      </Container>
    </Box>
  );
}
