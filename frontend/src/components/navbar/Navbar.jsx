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
import { UserLogout } from "../menu/UserLogout";

export default function Navbar() {
  const PATHS = [
    { to: "/", label: "Home" },
    { to: "/materials", label: "Materials" },
  ];

  const USER_INFO = localStorage.getItem("username");

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

                {/* Show this menu if user not logged in  */}
                {!USER_INFO ? (
                  <UserProfilToast />
                ) : (
                  <ChakraLink
                    as={NavLink}
                    to="/profile"
                    _activeLink={{ fontWeight: "bold" }}
                  >
                    Profile
                  </ChakraLink>
                )}
              </HStack>

              <HStack spacing={12} fontSize="xl" fontWeight="normal">
                {!USER_INFO ? (
                  <>
                    <ChakraLink
                      as={NavLink}
                      to="/login"
                      _activeLink={{ fontWeight: "bold" }}
                    >
                      Login
                    </ChakraLink>

                    <BtnRegister />
                  </>
                ) : (
                  <Box>
                    <UserLogout>Hi, {USER_INFO}!</UserLogout>
                  </Box>
                )}
              </HStack>
            </HStack>
          </HStack>

          <Divider borderColor="gray.300" />
        </Container>
      </Box>
    </>
  );
}
