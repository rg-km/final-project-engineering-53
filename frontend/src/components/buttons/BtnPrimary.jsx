import { Button } from "@chakra-ui/react";
import React from "react";

export default function BtnPrimary({ as, title, href, btnColor, textColor, scheme }) {
  return (
    <Button
      as={as}
      href={href}
      pt={0.5}
      width="240px"
      height="60px"
      fontSize="2xl"
      fontWeight="normal"
      variant="solid"
      borderRadius="50px"
      colorScheme={scheme}
      textColor={textColor}
      backgroundColor={btnColor}
    >
      {title}
    </Button>
  );
}
