import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Flex,
  Heading,
  Icon,
  StackDivider,
  Text,
  VStack,
  AvatarBadge,
} from "@chakra-ui/react";
// import { IconType } from "react-icons/lib";
import { FiHome, FiBookOpen, FiUsers, FiLogOut } from "react-icons/fi";
import { AdminLogout } from "../menu/AdminLogout";
import useAuth from "../../hooks/useAuth";

const SIDEBAR_LINKS = [
  ["Dashboard", FiHome, "/admin/dashboard"],
  ["Materials ", FiBookOpen, "/admin/materials"],
  ["Profile", FiUsers, "/admin/profile"],
];

export default function Sidebar() {
  const { auth } = useAuth();

  return (
    <VStack
      as="aside"
      h="100vh"
      w="fit-content"
      minW="220px"
      border="2px solid"
      borderColor="gray.200"
      p={6}
    >
      <VStack w="full" spacing={6}>
        <Avatar size="lg" src="jpg">
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
        <Flex flexDir="column" textAlign="center">
          <Heading as="h3" size="md">
            {auth.username ? auth.username : "Username"}
          </Heading>
          <Text textTransform="capitalize" pt={1}>
            {auth.role ? auth.role : "Role"}
          </Text>
        </Flex>
      </VStack>

      <VStack
        as="nav"
        divider={<StackDivider borderColor="gray.300" />}
        align="left"
        spacing={6}
        pt={16}
      >
        {SIDEBAR_LINKS.map(([menu, AsIcon, href]) => (
          <NavLink to={href} key={menu}>
            <Button
              w="full"
              justifyContent="flex-start"
              leftIcon={<Icon as={AsIcon} mb={1} />}
              variant="ghost"
              size="lg"
            >
              {menu}
            </Button>
          </NavLink>
        ))}

        <Box mt={12}>
          {auth.role ? (
            <AdminLogout leftIcon={<Icon as={FiLogOut} mb={1} />} />
          ) : (
            <Button w="full" colorScheme="teal" as={NavLink} to="/admin/login">
              Login as Admin
            </Button>
          )}
        </Box>
      </VStack>
    </VStack>
  );
}
