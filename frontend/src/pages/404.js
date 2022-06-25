import { Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BaseLayout from "../components/layouts/BaseLayout";

export default function NotFound() {
  return (
    <BaseLayout bgColor="#f8f7fc">
      <Heading as="h1" fontSize="80px">
        404
      </Heading>
      <Text fontSize="xl">The Intended Route is Not Found</Text>
      <Button as={Link} to="/" mt={8} colorScheme="blue" bgColor="#2477FF">
        Back to Home
      </Button>
    </BaseLayout>
  );
}
