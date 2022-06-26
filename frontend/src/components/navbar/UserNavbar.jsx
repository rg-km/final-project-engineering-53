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
import { UserLogout } from "../menu/UserLogout";
import useAuth from "../../hooks/useAuth";

export default function UserNavbar() {
  const PATHS = [
    { to: "/", label: "Home" },
    { to: "/materials", label: "Materials" },
    { to: "/profile", label: "Profile" },
  ];

  const { auth } = useAuth();

  return (
    <>
      <Box as="header" w="full" bgColor="#f8f7fc">
        <Container maxW="container.xl" height="100px">
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
                    key={path.to}
                    to={path.to}
                    _activeLink={{ fontWeight: "bold" }}
                  >
                    {path.label}
                  </ChakraLink>
                ))}
              </HStack>

              <HStack spacing={12} fontSize="xl" fontWeight="normal">
                <Box>
                  <UserLogout>Hi, {auth.username}!</UserLogout>
                </Box>
              </HStack>
            </HStack>
          </HStack>

          <Divider borderColor="gray.300" />
        </Container>
      </Box>
    </>
  );
}
