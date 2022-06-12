import { useEffect, useState } from "react";

import { Box, Container, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import SubjectCard from "../cards/SubjectCard";

export default function Learning() {
  const url = "http://localhost:8000/material";

  const [material, setMaterial] = useState(null);

  useEffect(() => {
    // nanti di improve lagi pakai axios
    fetch(url).then((res) => {
      return res.json().then((data) => {
        // console.log(data);
        setMaterial(data);
      });
    });
  }, []);

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

            <Flex width="50%" overflowX="scroll">
              <HStack justify="space-between" py={16} spacing={8}>
                {material &&
                  material.map((data) => (
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
            </Flex>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
