import { Container, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function Materials() {
  const { data: materials, loading } = useFetch("http://localhost:8000/materials");

  return (
    <Container maxW="container.xl" mt={16}>
      <Heading as="h1" pb={8}>
        Material
      </Heading>

      {loading && <Text>Loading...</Text>}

      {
        <UnorderedList spacing={2}>
          {materials &&
            materials.map((material) => (
              <ListItem key={material.id} _hover={{ textDecoration: "underline" }}>
                <Link to={`/materials/${material.id}`}>{material.title}</Link>
              </ListItem>
            ))}
        </UnorderedList>
      }
    </Container>
  );
}
