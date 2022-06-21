import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  Input,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Link,
} from "@chakra-ui/react";

const LoginPage = () => {
  //   const { toggleColorMode } = useColorMode();
  return (
    <Box
      background="url('/img/bg-hero-map.png')"
      style={{ height: "full", width: "full" }}
      //opacity="50%"
      height="982px"
      width="1512px"
      color="white"
    >
      <Box
        width="912px"
        height="796px"
        backgroundColor="white"
        alignItems="center"
        mx="auto"
        opacity="100%"
        borderRadius="50"
      >
        <form action="submit">
          <Stack spacing={3} mr="40" ml="40">
            <Heading mb={6} color="black" mt="100">
              Login
            </Heading>
            <FormControl isRequired>
              <FormLabel type="email" textColor="black">
                Email:
              </FormLabel>
              <Input
                id="email"
                type="email"
                aria-label="email"
                borderRadius="50"
                mb="10"
                color="black"
              ></Input>
              <FormLabel type="password" textColor="black">
                Password:
              </FormLabel>
              <Input
                id="password"
                type="password"
                aria-label="password"
                borderRadius="50"
                color="black"
              ></Input>
              <Text textAlign="right" textColor="gray" mt="5" mb="100">
                <Link href="">Lupa Password</Link>
              </Text>
            </FormControl>
            <Button type="submit" bgColor="#2477FF" size="md" borderRadius="50">
              Login
            </Button>
            <Button
              variant="outline"
              bgColor="white"
              color="#2477FF"
              size="md"
              borderRadius="50"
            >
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
export default LoginPage;
