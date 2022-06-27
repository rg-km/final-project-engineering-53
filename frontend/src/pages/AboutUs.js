import {
  Avatar,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import BaseLayout from "../components/layouts/BaseLayout";
import data from "../_data/about.json";

export default function AboutUs() {
  return (
    <BaseLayout align="flex-start" justify="flex-start">
      <Center flexDirection="column" w="full" py={24}>
        <Heading as="h1" fontSize="3xl" pb={8}>
          About Us
        </Heading>
        <Grid w="full" templateColumns="repeat(3, 1fr)" gap={8}>
          {data.map((member) => (
            <GridItem
              key={member.id}
              minH="200px"
              minW="300px"
              bgColor="gray.200"
              boxShadow="md"
              borderRadius={4}
              p={8}
            >
              <VStack spacing={6}>
                <Avatar size="lg" name={member.name} />
                <Heading as="h3" fontSize="xl" textTransform="capitalize">
                  {member.name}
                </Heading>
                <Text fontSize="lg">{member.position}</Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Center>
    </BaseLayout>
  );
}
