import {
  Box,
  Card,
  Flex,
  Avatar,
  Text,
  Separator,
  Button,
} from "@radix-ui/themes";
import { SlDislike, SlLike } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import moment from "moment";

import CommentCard from "./CommentCard";
import logo from "../../media/logoProfile.png";
import { useMemo } from "react";

const PostCard = ({ data }) => {
  const commentsByParentId = useMemo(() => {
    const group = [];

    data?.comments?.forEach((comment) => {
      if (comment.parent === null) {
        group.push(comment);
      }
    });

    return group;
  }, [data.comments]);

  console.log(data);

  return (
    <Box>
      <Card>
        {/* User Profile info */}
        <Flex gap="3" align="center" mb="5">
          <Avatar size="3" src={logo} radius="full" fallback="T" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {data.user}
            </Text>
            <Text as="div" size="2" color="gray">
              {moment(data.created_at).format("lll")}
            </Text>
          </Box>
        </Flex>

        {/* Post content */}
        <Box>
          <Text as="p" className="text-justify mb-[1.5rem]">
            {data?.description}
          </Text>

          {/* reactions icons */}
          <Flex gap="5">
            {/* <Flex className="py-1" align="baseline" gap="2">
              <SlLike className="cursor-pointer" />
              <span>55</span>
            </Flex>

            <Flex align="center" gap="2">
              <SlDislike className="cursor-pointer" />
              <span>12</span>
            </Flex> */}

            <Button type="button">
              <Flex
                className="bg--dark px-3 py-1 rounded-md cursor-pointer"
                align="center"
                gap="2"
                onClick={() => {
                  const element = document.getElementById(
                    `comment--box-${data.id}/${data.user}`
                  );

                  element?.classList.contains("hidden")
                    ? element?.classList.remove("hidden")
                    : element?.classList.add("hidden");
                }}
              >
                <LiaComments />
                <span>{commentsByParentId?.length}</span>
              </Flex>
            </Button>
          </Flex>
        </Box>

        {/* comments box */}
        <Box id={`comment--box-${data.id}/${data.user}`} className="hidden">
          <Separator my="3" size="4" />
          <CommentCard comments={commentsByParentId} />
        </Box>
      </Card>
    </Box>
  );
};

export default PostCard;
