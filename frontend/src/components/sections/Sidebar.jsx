import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import { FiHome, FiBookOpen, FiUsers } from "react-icons/fi";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <Flex
      h="full"
      border="2px solid"
      borderColor="gray.200"
      justifyContent="space-between"
    >
      <Flex p="5%" flrxDir="column" w="100%" alignItems="flex-start" mb={4}>
        <Flex mt={4} align="center">
          {/* profil picture */}
          <Avatar size="md" src="jpg" />
          <Flex flexDir="column" ml={4}>
            <Heading as="h3" size="sm">
              Username
            </Heading>
            <Text>Admin</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex p="5%" flexDir="column" alignItems="flex-start" as="nav">
        <NavItem icon={FiHome} title="Home" />
        <NavItem icon={FiBookOpen} title="Material" />
        <NavItem icon={FiUsers} title="User" />
      </Flex>
    </Flex>
  );
}
