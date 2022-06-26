import React from "react";
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

export default function NavItem({ title, icon }) {
  return (
    <Flex mt={30} flexDir="column" w="100%">
      <Menu placement="right">
        <Link p={3} borderRadius={8}>
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" />
              <Text ml={5}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
