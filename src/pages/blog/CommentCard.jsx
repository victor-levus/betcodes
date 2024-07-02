import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import { TbSend2 } from "react-icons/tb";
import { LiaComments } from "react-icons/lia";
import { SlLike, SlDislike } from "react-icons/sl";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

const CommentCard = ({ comments }) => {
  const user = useSelector(selectUser);

  return (
    <Flex gap="4" direction="column" px="5">
      {/* input comment field */}
      {user.id && (
        <Flex align="center" gap="2">
          <input
            type="text"
            placeholder="Add Comment"
            className="w-full outline-0 p-3 bg--dark rounded-full"
            // onChange={handleInputChange}
          />

          <Button className="" size="3">
            <TbSend2 />
          </Button>
        </Flex>
      )}

      {/* List of comments */}
      {comments?.map((comment) => (
        <Box key={comment?.id} className="bg-black p-3 rounded-3xl">
          {/* User Profile info */}
          <Flex gap="3" align="center" mb="5">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {comment?.user}
              </Text>
              <Text as="div" size="2" color="gray">
                {moment(comment?.placed_at).format("lll")}
              </Text>
            </Box>
          </Flex>
          {/* Post content */}
          <Box>
            <Text as="p" className="text-justify mb-[1.5rem]">
              {comment?.description}
            </Text>
            {/* reactions icons */}
            <Flex gap="5">
              <Flex className="py-1" align="baseline" gap="2">
                <SlLike className="cursor-pointer" />
                <span>55</span>
              </Flex>
              <Flex align="center" gap="2">
                <SlDislike className="cursor-pointer" />
                <span>12</span>
              </Flex>
              <Button type="button">
                <Flex
                  className="bg--1 px-3 py-1 rounded-md cursor-pointer"
                  align="center"
                  gap="2"
                >
                  <LiaComments />
                  <span>12</span>
                </Flex>
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default CommentCard;
