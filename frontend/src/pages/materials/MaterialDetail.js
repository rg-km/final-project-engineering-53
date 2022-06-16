import { useParams } from "react-router-dom";
import { Container, Heading, Text } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";

export default function MaterialDetail() {
  const { id } = useParams();
  const { data: material, loading } = useFetch("http://localhost:8000/materials/" + id);

  return (
    <Container maxW="container.xl" mt={16}>
      {loading && <Heading as="h1">Loading...</Heading>}

      {material && (
        <>
          <Heading as="h1" pb={8}>
            {material.title}
          </Heading>
          <Text>{material.description}</Text>
        </>
      )}
    </Container>
  );
}
