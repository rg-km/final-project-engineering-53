import { NavLink, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { BtnLikes } from "../../components/buttons/BtnLikes";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";

export default function MaterialDetail() {
  const { auth } = useAuth();

  const { id } = useParams();
  const { data: materials, loading } = useFetch(
    "http://localhost:8080/materials/" + id
  );

  const data = materials?.materials;

  return (
    <Container maxW="container.xl" minH="90vh">
      <Stack as="section" direction="column" spacing={16} my={16}>
        <HStack>
          <Button as={NavLink} to="/materials" leftIcon={<MdArrowBack />}>
            Back To Materials
          </Button>

          <Spacer />

          {auth?.username ? <BtnLikes /> : <BtnLikes disabled={true} />}
        </HStack>

        {loading && <Heading as="h1">Loading...</Heading>}

        {materials && (
          <>
            <VStack w="full" textAlign="center" spacing={8}>
              <Image
                src={data.image}
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

              <Text
                fontSize="lg"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </Box>
          </>
        )}
      </Stack>
    </Container>
  );
}
