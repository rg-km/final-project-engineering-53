/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export const UserLogout = ({ children }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location = "/login";
  };

  return (
    <Menu>
      <MenuButton as={Button}>{children}</MenuButton>
      <MenuList fontSize="md">
        <MenuItem as={NavLink} to="/profile">
          My Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};
