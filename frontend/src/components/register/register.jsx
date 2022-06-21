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

const RegisterPage = () => {
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
              Register
            </Heading>
            <FormControl isRequired>
              <FormLabel type="username" textColor="black">
                Username:
              </FormLabel>
              <Input
                id="username"
                type="username"
                aria-label="username"
                borderRadius="50"
                mb="10"
                color="black"
              ></Input>
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
                mb="100"
              ></Input>
            </FormControl>
            <Button type="submit" bgColor="#2477FF" size="md" borderRadius="50">
              Register
            </Button>
            <Text textAlign="center" textColor="black" mt="5" mb="100">
                Have an account? <Link href="./login">Login</Link>
              </Text>
           
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
export default RegisterPage;
