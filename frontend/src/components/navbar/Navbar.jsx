import { Container, Button, HStack, Image, Link, Spacer } from "@chakra-ui/react";
import Logo from "../../assets/logo192.png";
import { Routes, Route } from "react-router-dom";
import Material from "../../pages/Material"

export default function Navbar() {
  return (
    <>
      <Container as="header" maxW="container.xl" height="100px">
        <HStack as="nav" height="full" fontWeight="normal">
          <Link href="/">
            <Image src={Logo} boxSize="50px" alt="App Logo" />
          </Link>

          <Spacer />

          <HStack spacing={24}>
            <HStack spacing={12} fontSize="xl" fontWeight="normal">
              <Link href="#" fontWeight="bold">
                Home
              </Link>
              <Link to="/material">Material</Link>
              <Routes>
                <Route path="material" element={<Material />} />
              </Routes>
              <Link href="#" opacity={0.5}>
                Profile
              </Link>
            </HStack>

            <HStack spacing={12} fontSize="xl" fontWeight="normal">
              <Link href="#">Login</Link>
              <Button
                as="a"
                href="#"
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
