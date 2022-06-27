import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function Search({ children }) {
  return (
    <>
      {/* Search Material? */}
      <InputGroup maxW="600px" borderColor="gray.400">
        <InputLeftElement
          pointerEvents="none"
          children={<FiSearch color="gray.400" />}
        />
        {children}
      </InputGroup>
    </>
  );
}
