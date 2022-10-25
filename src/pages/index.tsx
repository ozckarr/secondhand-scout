import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { API } from "aws-amplify";

import { useUser } from "../context/AuthContext";
import { listPosts } from "../graphql/queries";
import { Post } from "../API";

export default function Home() {
  const { user } = useUser();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostFromAPI = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: Post[];
        error: any[];
      };

      if (allPosts.data) {
        setPosts(allPosts.data);
        return allPosts.data;

        /* 
       Dummydata ico emergency
       setPosts([
          {
            __typename: "Post",
            id: "string",
            title: "string",
            createdAt: "string",
            updatedAt: "string",
            owner: "1234",
          },
        ]);*/
      } else {
        throw new Error("Couldn't get post");
      }
    };
    fetchPostFromAPI();
  }, []);

  console.log("User", user);
  console.log("Posts", posts);
  return <Typography variant="h1">Hello</Typography>;
}
