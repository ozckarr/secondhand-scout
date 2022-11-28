import React, { ReactElement, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { GetStaticProps, GetStaticPaths } from "next";
import { API, withSSRContext } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import {
  ListPostsQuery,
  GetPostQuery,
  Post,
  CreateCommentInput,
  CreateCommentMutation,
  Comment,
} from "../../API";
import PostPreview from "../../components/PostPreview";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import PostComment from "../../components/PostComment";
import { createComment } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

interface IFormInput {
  comment: string;
}

interface Props {
  post: Post;
}

export default function IndividualPost({ post }: Props): ReactElement {
  const [comments, setComments] = useState<Comment[]>(
    post.comments.items as Comment[]
  );

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const newCommentInput: CreateCommentInput = {
      postCommentsId: post.id,
      content: data.comment,
    };
    const createNewComment = (await API.graphql({
      query: createComment,
      variables: { input: newCommentInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as { data: CreateCommentMutation };
    reset();
    setComments([...comments, createNewComment.data.createComment as Comment]);
  };

  return (
    <Container maxWidth="md">
      <PostPreview post={post} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        style={{ marginTop: 32, marginBottom: 64 }}
      >
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              multiline
              style={{ width: "100%" }}
              variant="outlined"
              id="comment"
              name="comment"
              label="Add a Comment"
              type="text"
              error={errors.comment ? true : false}
              helperText={errors.comment ? errors.comment.message : null}
              {...register("comment", {
                required: {
                  value: true,
                  message: "Please enter a username.",
                },
                maxLength: {
                  value: 240,
                  message: "Maximum of characters reached.",
                },
              })}
            />
          </Grid>
          <Grid item>
            <Button fullWidth variant="contained" color="default" type="submit">
              Add Comment
            </Button>
          </Grid>
        </Grid>
      </form>

      {comments
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Call an external API endpoint to get posts.
  const SSR = withSSRContext();

  const postsQuery = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params.id,
    },
  })) as { data: GetPostQuery };

  // By returning { props: { posts } }, the Individual Post component
  // will receive `post` as a prop at build time
  return {
    props: {
      post: postsQuery.data.getPost as Post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();

  const response = (await SSR.API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    errors: any[];
  };

  // Get the paths we want to pre-render based on posts
  const paths = response.data.listPosts.items.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};
