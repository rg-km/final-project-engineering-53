import { Box, Container, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import SubjectCard from "../cards/SubjectCard";
import useFetch from "../../hooks/useFetch";

export default function Learning() {
  const { data: materials, loading } = useFetch("http://localhost:8000/materials");

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
                As a beginner, Future Map updates with your learning needs. Here we provide the
                latest updates on your learning map.
              </Text>
            </Box>

            <Flex width="55%" overflowX="scroll">
              {!loading ? (
                <HStack justify="space-between" py={16} spacing={8}>
                  {materials &&
                    materials.map((data) => (
                      <SubjectCard
                        key={data.id}
                        id={data.id}
                        thumbnail={data.thumbnail}
                        title={data.title}
                        title_eng={data.title_eng}
                        description={data.description}
                      />
                    ))}
                </HStack>
              ) : (
                <Heading as="h2" fontSize="3xl">
                  Loading...
                </Heading>
              )}
            </Flex>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
