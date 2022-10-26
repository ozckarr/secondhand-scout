import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { API } from "aws-amplify";

import { useUser } from "../context/AuthContext";
import { listPosts } from "../graphql/queries";
import { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";

export default function Home() {
  const { user } = useUser();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostFromAPI = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        error: any[];
      };

      if (allPosts.data) {
        //setPosts(allPosts.data.listPosts.items as Post[]);
        //DUMMY DATA
        setPosts([
          {
            __typename: "Post",
            id: "string",
            title: "string",
            createdAt: "string",
            updatedAt: "string",
            owner: "string",
          },
          {
            __typename: "Post",
            id: "string",
            title: "string",
            createdAt: "string",
            updatedAt: "string",
            owner: "string",
          },
        ]);
        return allPosts.data.listPosts.items as Post[];
      } else {
        throw new Error("Couldn't get post");
      }
    };
    fetchPostFromAPI();
  }, []);

  console.log("User", user);
  console.log("Posts", posts);
  return (
    <Container maxWidth="md">
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  );
}
