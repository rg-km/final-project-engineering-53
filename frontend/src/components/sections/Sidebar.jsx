import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { IconType } from "react-icons/lib";
import { FiHome, FiBookOpen, FiUsers } from "react-icons/fi";

const SIDEBAR_LINKS = [
  ["Dashboard", FiHome, "/Dashboard"],
  ["Materials ", FiBookOpen, "/Materials"],
  ["Users", FiUsers, "#"],
];

export default function Sidebar() {
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
      <VStack w="full" spacing={4}>
        <Avatar size="lg" src="jpg" />
        <Flex flexDir="column" textAlign="center">
          <Heading as="h3" size="md">
            Username
          </Heading>
          <Text>Admin</Text>
        </Flex>
      </VStack>

      <VStack
        as="nav"
        divider={<StackDivider borderColor="gray.300" />}
        align="left"
        spacing={8}
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
      </VStack>
    </VStack>
  );
}
