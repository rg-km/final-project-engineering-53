import { Box, Button, Container, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import HeroImg from "../../assets/img/hero-img.png";

export default function Hero() {
  return (
    <>
      <Box as="section">
        <Container maxW="container.xl" minH="50vh">
          <Stack direction="row" justify="space-between" mt={8}>
            <VStack w="50%" justify="center" align="start" spacing={8}>
              <Heading as="h1" fontSize="6xl">
                Know your future map with us!
              </Heading>
              <Text fontSize="3xl" opacity={0.9}>
                One platform to know your future map with amazing learning journey!
              </Text>
              <Button
                as="a"
                href="#"
                width="240px"
                height="60px"
                fontSize="2xl"
                fontWeight="normal"
                variant="solid"
                colorScheme="blue"
                borderRadius="50px"
                backgroundColor="#2477FF"
              >
                Get Started
              </Button>
            </VStack>

            <Box w="50%">
              <Image src={HeroImg} alt="Hero image" />
            </Box>
          </Stack>
        </Container>

        {/* What is Future Map? */}
        <Box
          my={24}
          width="full"
          height="535px"
          background="linear-gradient(rgba(229, 229, 229, 0.8), rgba(229, 229, 229, 0.8)), url('/img/bg-hero-map.png')"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgColor="black"
        >
          <Container height="full" maxW="container.xl" py={12}>
            <VStack height="full" justify="center" textAlign="center" spacing={12}>
              <Heading as="h2" fontSize="5xl">
                What is Future Map?
              </Heading>
              <Text fontSize="2xl">
                Future Map is a platform for the younger generation to prepare a map for their learning journey. Future
                Map will help you learn the basic things that must be designed before entering college according to your
                major. Likewise, with students and graduates, Future Map will assist you in starting your journey to
                learn other new things.
              </Text>
              <Text fontSize="2xl">Want to know how your journey was?</Text>

              <Button
                as="a"
                href="#"
                width="240px"
                height="60px"
                fontSize="2xl"
                fontWeight="normal"
                variant="outline"
                colorScheme="blue"
                borderRadius="50px"
                border="2px solid #2477FF"
                color="#2477FF"
              >
                Learn More
              </Button>
            </VStack>
          </Container>
        </Box>
      </Box>
    </>
  );
}
