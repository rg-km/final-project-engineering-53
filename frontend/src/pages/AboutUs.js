import {
  Avatar,
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
      <Grid w="full" templateColumns="repeat(3, 1fr)" gap={8} my={16}>
        {data.map((member) => (
          <GridItem
            key={member.id}
            minH="200px"
            minW="300px"
            bgColor="gray.200"
            boxShadow="lg"
            borderRadius={4}
            p={8}
          >
            <VStack spacing={4}>
              <Avatar size="lg" name={member.name} />
              <Heading as="h3" fontSize="xl">
                {member.name}
              </Heading>
              <Text fontSize="lg">{member.position}</Text>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </BaseLayout>
  );
}
