import {
  Box,
  Container,
  Grid,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import MaterialCard from "../../components/cards/MaterialCard";
import Search from "../../components/Search";

export default function Materials() {
  const { data: materials, loading } = useFetch(
    "http://localhost:8080/materials"
  );
  const getMaterials = materials?.materials; // get response from backend

  return (
    <Container maxW="container.xl">
      <VStack w="full" justify="center" spacing={8} my={24}>
        <Heading as="h2" fontSize="5xl">
          Choose your interest!
        </Heading>
        <Text fontSize="2xl" opacity={0.9}>
          Search and select the major journey you want to know!
        </Text>

        <Search>
          <Input type="text" borderRadius="50" placeholder="Search material" />
        </Search>
      </VStack>

      {loading && <Text>Loading...</Text>}

      <Box as="section" minH="100vh" mb={24}>
        {
          <Grid templateColumns="repeat(3, 1fr)" gap={12}>
            {getMaterials &&
              getMaterials?.map((material) => (
                <MaterialCard
                  key={material.id}
                  id={material.id}
                  title={material.header}
                  thumbnail={material.image}
                  description={material.sub_header}
                  content={material.content}
                />
              ))}
          </Grid>
        }
      </Box>
    </Container>
  );
}
