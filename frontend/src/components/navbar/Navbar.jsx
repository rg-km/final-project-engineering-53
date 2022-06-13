import { NavLink } from "react-router-dom";
import { Container, Button, HStack, Image, Link as ChakraLink, Spacer } from "@chakra-ui/react";
import Logo from "../../assets/logo192.png";

export default function Navbar() {
  const PATHS = [
    { to: "/", label: "Home" },
    { to: "/material", label: "Material" },
    // { to: "", label: "Profile" },
  ];

  return (
    <>
      <Container as="header" maxW="container.xl" height="100px">
        <HStack as="nav" height="full" fontWeight="normal">
          <NavLink to="/">
            <Image src={Logo} boxSize="50px" alt="App Logo" />
          </NavLink>

          <Spacer />

          <HStack spacing={24}>
            <HStack spacing={12} fontSize="xl" fontWeight="normal">
              {PATHS.map((path) => (
                <ChakraLink
                  as={NavLink}
                  end
                  key={path.to}
                  to={path.to}
                  _activeLink={{ fontWeight: "bold" }}
                >
                  {path.label}
                </ChakraLink>
              ))}
              <ChakraLink opacity={0.6}>Profile</ChakraLink>
            </HStack>

            <HStack spacing={12} fontSize="xl" fontWeight="normal">
              <ChakraLink>Login</ChakraLink>
              <Button
                as="a"
                // href="#"
                size="xl"
                width="160px"
                height="40px"
                fontWeight="normal"
                variant="solid"
                colorScheme="blue"
                borderRadius="50px"
                backgroundColor="#2477FF"
              >
                Register
              </Button>
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </>
  );
}
