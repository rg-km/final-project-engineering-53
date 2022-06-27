import { likesStore } from "../../store/likesStore";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { FcLike } from "react-icons/fc";

export const BtnLikes = () => {
  const like = likesStore((state) => state.like);
  const addlikes = likesStore((state) => state.addLikes);

  return (
    <ButtonGroup isAttached variant="outline">
      <Button pt={1}>{like}</Button>
      <IconButton aria-label="Add likes" icon={<FcLike />} onClick={addlikes} />
    </ButtonGroup>
  );
};
