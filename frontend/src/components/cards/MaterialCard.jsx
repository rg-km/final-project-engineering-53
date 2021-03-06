import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function SubjectCard({
  id,
  thumbnail,
  title,
  description,
  cardWidth,
}) {
  return (
    <Box
      width={cardWidth}
      minH="520px"
      h="full"
      bgColor="white"
      boxShadow="lg"
      borderRadius={8}
      p={8}
    >
      <VStack
        w="full"
        h="full"
        textAlign="left"
        justify="space-between"
        spacing={6}
      >
        <Image src={thumbnail} alt="Cover image" borderRadius={4} />

        <Box width="full">
          <Heading
            as="h5"
            fontSize="1.2rem"
            textTransform="capitalize"
            lineHeight={1.5}
          >
            {title}
          </Heading>
        </Box>

        <Box height="92px" w="full" overflow="hidden">
          <Text textOverflow="ellipsis">{description}</Text>
        </Box>

        <Box pt={4}>
          <Link to={`/materials/${id}`}>
            <Button
              id={id}
              size="lg"
              colorScheme="blue"
              color="#2477FF"
              variant="ghost"
            >
              Learn More
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
}
