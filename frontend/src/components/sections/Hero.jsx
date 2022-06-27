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
import HeroImg from "../../assets/img/hero-img.png";
import dataDummy from "../../_data/hero.json";

export default function Hero() {
  const data = dataDummy[0];

  return (
    <>
      <Box as="section">
        <Container maxW="container.xl" minH="50vh">
          <Stack direction="row" justify="space-between" mt={8}>
            <VStack w="50%" justify="center" align="start" spacing={8}>
              <Heading as="h1" fontSize="6xl">
                {data.heading_1}
              </Heading>
              <Text fontSize="3xl" opacity={0.9}>
                {data.subheading_1}
              </Text>
              <Button
                as="a"
                href="#learning-materials"
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
          bgSize="cover"
          bgRepeat="no-repeat"
          bgColor="black"
        >
          <VStack
            height="full"
            maxW="container.xl"
            justify="center"
            margin="0 auto"
            textAlign="center"
            spacing={8}
          >
            <Heading as="h2" fontSize="5xl">
              {data.heading_2}
            </Heading>
            <Text fontSize="2xl">{data.subheading_2}</Text>
            <Text fontSize="2xl" pb={4}>
              {data.subheading_3}
            </Text>

            <Button
              as="a"
              href="#register-now"
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
        </Box>
      </Box>
    </>
  );
}
