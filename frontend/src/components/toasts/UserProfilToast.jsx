import { Link, useToast } from "@chakra-ui/react";

export const UserProfilToast = () => {
  const toast = useToast();
  return (
    <Link
      onClick={() =>
        toast({
          title: "Are you logged in?",
          description: "Please login first to visit this menu.",
          status: "info",
          duration: 6000,
          position: "top",
          isClosable: true,
        })
      }
    >
      Profile
    </Link>
  );
};
