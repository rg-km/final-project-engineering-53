import { likesStore } from "../../store/likesStore";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { FcLike } from "react-icons/fc";

export const BtnLikes = ({ disabled }) => {
  const like = likesStore((state) => state.like);
  const addlikes = likesStore((state) => state.addLikes);

  return (
    <ButtonGroup isAttached isDisabled={disabled} variant="outline">
      <Button pt={1} borderColor="gray.400">
        {like}
      </Button>
      <IconButton
        aria-label="Add likes"
        borderColor="gray.400"
        icon={<FcLike />}
        onClick={addlikes}
      />
    </ButtonGroup>
  );
};
