import { Box, Container, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import MaterialCard from "../../components/cards/MaterialCard";

export default function Materials() {
  const { data: materials, loading } = useFetch("http://localhost:8000/materials");

  return (
    <Container maxW="container.xl">
      <VStack w="full" justify="center" spacing={8} my={24}>
        <Heading as="h2" fontSize="5xl">
          Choose your interest!
        </Heading>
        <Text fontSize="2xl" opacity={0.9}>
          Search and select the major journey you want to know!
        </Text>
      </VStack>

      {loading && <Text>Loading...</Text>}

      <Box as="section" minH="100vh" mb={24}>
        {
          <Grid templateColumns="repeat(3, 1fr)" gap={12}>
            {materials &&
              materials.map((material) => (
                <MaterialCard
                  key={material.id}
                  id={material.id}
                  thumbnail={material.thumbnail}
                  title={material.title}
                  title_eng={material.title_eng}
                  description={material.description}
                />
              ))}
          </Grid>
        }
      </Box>
    </Container>
  );
}
