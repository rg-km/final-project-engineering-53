import { NavLink, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import useFetch from "../../hooks/useFetch";

export default function MaterialDetail() {
  const { id } = useParams();
  const { data: materials, loading } = useFetch(
    "http://localhost:8080/materials/" + id
  );

  const data = materials?.materials;

  return (
    <Container maxW="container.xl" minH="90vh">
      <Stack as="section" direction="column" spacing={16} my={16}>
        <Box>
          <Button as={NavLink} to="/materials" leftIcon={<MdArrowBack />}>
            Back To Materials
          </Button>
        </Box>

        {loading && <Heading as="h1">Loading...</Heading>}

        {materials && (
          <>
            <VStack w="full" textAlign="center" spacing={8}>
              <Image
                src={`http://localhost:8080/${data.image}`}
                alt="Cover image"
                maxW="480px"
                borderRadius={4}
              />
              <Heading as="h1">{data.title}</Heading>
              <Text fontSize="xl" lineHeight={1.8}>
                {data.sub_header}
              </Text>
            </VStack>

            <Box minH="480px">
              <Heading as="h2" fontSize="2xl" pb={8}>
                Materi yang Dipelajari
              </Heading>
              <Text fontSize="lg">{data.content}</Text>
            </Box>
          </>
        )}
      </Stack>
    </Container>
  );
}
