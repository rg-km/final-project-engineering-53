import { Box, Container, Flex } from "@chakra-ui/react";

export default function BaseLayout({ children, bgColor, align, justify }) {
  return (
    <Box as="section" width="full" bgColor={bgColor}>
      <Container maxW="container.xl" minH="100vh" color="#1a202c">
        <Flex
          w="full"
          h="full"
          direction="column"
          align={align ? align : "center"}
          justify={justify ? justify : "center"}
          py={20}
        >
          {children}
        </Flex>
      </Container>
    </Box>
  );
}
