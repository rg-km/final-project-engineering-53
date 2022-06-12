import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function SubjectCard() {
  return (
    <>
      <Box width="400px" bgColor="white" boxShadow="lg" borderRadius={8} p={8}>
        <VStack w="full" textAlign="left" spacing={6}>
          <Image src="https://picsum.photos/600/300" borderRadius={4} />
          <Heading as="h5" fontSize="2xl">
            Teknologi Informasi (Information Technology)
          </Heading>
          <Text>
            adalah jurusan yang mempelajari tentang sistem atau teknologi olah data termasuk implementasi pada...
          </Text>

          <Box pt={4}>
            <Button colorScheme="blue" variant="ghost">
              Learn More
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
