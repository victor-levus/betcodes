import { useSelector } from "react-redux";
import { Box, Card, Flex, Spinner, Text } from "@radix-ui/themes";

import TextArea from "./TextArea";
import PostCard from "./PostCard";
import FlexColumn from "../../components/ruiComponents/FlexColumn";
import { getPostStatus, selectAllPosts } from "../../store/slices/postSlice";
import { selectUser } from "../../store/slices/userSlice";
import _ from "lodash";

const BlogPage = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const user = useSelector(selectUser);
  const construction = false;

  if (construction)
    return (
      <Card mt="9">
        <Text>Page still under construction</Text>
      </Card>
    );

  if (postStatus === "loading") return <Spinner />;

  return (
    <Flex direction={"column"} gap="5" className="">
      <Text size="5" weight="bold">
        Blog Post
      </Text>

      {/* Post input form */}
      {user.id && (
        <Box>
          <TextArea />
        </Box>
      )}

      {/* Posted Lists */}
      <FlexColumn gap="5" className=" ">
        {/* <Heading size="4">List of Post</Heading> */}
        {[...posts]
          .sort((a, b) => new Date(b.placed_at) - new Date(a.placed_at))
          .map((post, i) => (
            <PostCard key={i} data={{ ...post, index: i }} />
          ))}
      </FlexColumn>
    </Flex>
  );
};

export default BlogPage;
