import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const BtnRegister = () => {
  return (
    <Button
      as={NavLink}
      to="/register"
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
  );
};
