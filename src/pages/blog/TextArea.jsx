import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../store/slices/postSlice";
import { selectUser } from "../../store/slices/userSlice";

const TextArea = () => {
  const dispatch = useDispatch();
  const [postInput, setPostInput] = useState("");
  const user = useSelector(selectUser);

  const handleInputChange = (e) => {
    setPostInput(e.target.value);
  };

  const handlePostSubmit = () => {
    console.log("post submitted");
    dispatch(addNewPost({ description: postInput, user: user.id }));
  };

  return (
    <Flex gap="3" direction="column">
      <textarea
        placeholder="Post anything"
        className="w-full outline-0 h-36 p-2 bg--dark"
        onChange={handleInputChange}
      />

      <Flex justify="end">
        <Button
          disabled={!Boolean(postInput)}
          onClick={handlePostSubmit}
          className="w-20"
          size="4"
        >
          Post
        </Button>
      </Flex>
    </Flex>
  );
};

export default TextArea;
