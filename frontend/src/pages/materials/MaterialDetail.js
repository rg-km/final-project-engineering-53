import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";

export default function MaterialDetail() {
  const { id } = useParams();
  const { data: material, loading } = useFetch("http://localhost:8000/materials/" + id);

  // console.log(material);

  return (
    <Container maxW="container.xl">
      <Stack as="section" direction="column" spacing={16} my={24}>
        {loading && <Heading as="h1">Loading...</Heading>}

        {material && (
          <>
            <VStack w="full" textAlign="center" spacing={8}>
              <Image
                src={material.thumbnail}
                alt={`Image of ${material.title_eng}`}
                borderRadius={4}
                pb={8}
              />
              <Heading as="h1">
                {material.title} ({material.title_eng})
              </Heading>
              <Text fontSize="xl" lineHeight={1.8}>
                {material.description}
              </Text>
            </VStack>

            <Box>
              <Heading as="h2" fontSize="2xl" pb={6}>
                Materi yang Dipelajari
              </Heading>

              <OrderedList fontSize="lg" spacing={2}>
                {material?.subjects?.map((subject, index) => (
                  <ListItem key={index}>{subject}</ListItem>
                ))}
              </OrderedList>
            </Box>
          </>
        )}
      </Stack>
    </Container>
  );
}
