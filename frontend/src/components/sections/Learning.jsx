import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import MaterialCard from "../cards/MaterialCard";
import useFetch from "../../hooks/useFetch";

export default function Learning() {
  const { data: materials, loading } = useFetch(
    "http://localhost:8080/materials"
  );

  const getMaterials = materials?.materials; // get response from backend

  console.log(getMaterials);

  return (
    <>
      <Box as="section" id="learning-materials">
        <Container maxW="container.xl" height="100vh">
          <Stack
            direction="row"
            height="full"
            align="center"
            justify="space-between"
            spacing={8}
          >
            <Box width="40%">
              <Heading as="h1" fontSize="6xl">
                What will you learn today?
              </Heading>
              <Text fontSize="3xl" opacity={0.9} mt={8}>
                As a beginner, Future Map updates with your learning needs. Here
                we provide the latest updates on your learning map.
              </Text>
            </Box>

            <Flex width="55%" overflowX="scroll">
              {!loading ? (
                <HStack justify="space-between" py={16} spacing={8}>
                  {materials &&
                    getMaterials.map((material) => (
                      <MaterialCard
                        cardWidth="400px"
                        key={material.id}
                        id={material.id}
                        title={material.header}
                        thumbnail={material.image}
                        description={material.sub_header}
                        content={material.content}
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
