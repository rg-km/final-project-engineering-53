/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@chakra-ui/react";

export const AdminLogout = ({ leftIcon }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location = "/admin/login";
  };

  return (
    <Button
      w="full"
      justifyContent="flex-start"
      leftIcon={leftIcon}
      variant="outline"
      size="lg"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
