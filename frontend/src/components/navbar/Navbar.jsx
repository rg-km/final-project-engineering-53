import { NavLink } from "react-router-dom";
import {
  Box,
  Container,
  HStack,
  Image,
  Link as ChakraLink,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import Logo from "../../assets/logo192.png";
import { UserProfilToast } from "../toasts/UserProfilToast";
import { BtnRegister } from "../buttons/BtnRegister";

export default function Navbar() {
  const PATHS = [
    { to: "/", label: "Home" },
    { to: "/materials", label: "Materials" },
    { to: "/about-us", label: "About Us" },
  ];

  return (
    <>
      <Box as="header" w="full" bgColor="#f8f7fc">
        <Container maxW="container.xl" height="100px">
          <HStack as="nav" height="full" fontWeight="normal">
            <Box>
              <NavLink to="/">
                <Image src={Logo} h="75px" alt="App Logo" />
              </NavLink>
            </Box>

            <Spacer />

            <HStack spacing={24}>
              <HStack spacing={12} fontSize="xl" fontWeight="normal">
                {PATHS.map((path) => (
                  <ChakraLink
                    as={NavLink}
                    key={path.to}
                    to={path.to}
                    _activeLink={{ fontWeight: "bold" }}
                  >
                    {path.label}
                  </ChakraLink>
                ))}
                {/* Show this menu if user is not logged in */}
                <UserProfilToast />
              </HStack>

              <HStack spacing={12} fontSize="xl" fontWeight="normal">
                <ChakraLink
                  as={NavLink}
                  to="/login"
                  _activeLink={{ fontWeight: "bold" }}
                >
                  Login
                </ChakraLink>

                <BtnRegister />
              </HStack>
            </HStack>
          </HStack>

          <Divider borderColor="gray.300" />
        </Container>
      </Box>
    </>
  );
}
