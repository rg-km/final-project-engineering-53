import { Box, Container, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import SubjectCard from "../cards/SubjectCard";

export default function Learning() {
  return (
    <>
      <Box as="section">
        <Container maxW="container.xl" height="100vh">
          <Stack direction="row" height="full" align="center" justify="space-between" spacing={8}>
            <Box width="40%">
              <Heading as="h1" fontSize="6xl">
                What will you learn today?
              </Heading>
              <Text fontSize="3xl" opacity={0.9} mt={8}>
                As a beginner, Future Map updates with your learning needs. Here we provide the latest updates on your
                learning map.
              </Text>
            </Box>

            <Flex width="50%" overflowX="scroll">
              <HStack justify="space-between" py={16} spacing={8}>
                <SubjectCard />
                <SubjectCard />
                <SubjectCard />
                <SubjectCard />
              </HStack>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
