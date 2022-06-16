import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function SubjectCard({ id, thumbnail, title, title_eng, description, cardWidth }) {
  return (
    <>
      <Box width={cardWidth} minH="520px" bgColor="white" boxShadow="lg" borderRadius={8} p={8}>
        <VStack w="full" textAlign="left" spacing={6}>
          <Image src={thumbnail} alt={`Image of ${title_eng}`} borderRadius={4} />

          <Box width="full">
            <Heading as="h5" fontSize="2xl">
              {title}
            </Heading>
            <Heading as="h5" fontSize="2xl" pt={2}>
              ({title_eng})
            </Heading>
          </Box>

          <Box height="92px" overflow="hidden">
            <Text textOverflow="ellipsis">{description}</Text>
          </Box>

          <Box pt={4}>
            <Link to={`/materials/${id}`}>
              <Button id={id} size="lg" colorScheme="blue" color="#2477FF" variant="ghost">
                Learn More
              </Button>
            </Link>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
