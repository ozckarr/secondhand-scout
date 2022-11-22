import React, { ReactElement, useState } from "react";
import { API, Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

import { Button, Container, Grid, TextField } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import ImageDropzone from "../components/ImageDropzone";
import {
  CreatePostInput,
  CreatePostMutation,
  CreatePostMutationVariables,
} from "../API";
import { createPost } from "../graphql/mutations";
import router from "next/router";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

interface IFormInput {
  title: string;
  content: string;
  // image?: string;
}

interface Props {}

export default function Create({}: Props): ReactElement {
  const [file, setFile] = useState<File>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(file);
    console.log(data);

    if (file) {
      // user uploaded
      try {
        const imagePath = uuidv4();

        await Storage.put(imagePath, file, {
          contentType: file.type, // contentType is optional
        });

        // Once the upload is uploaded...
        const createNewPostInput: CreatePostInput = {
          title: data.title,
          contents: data.content,
          image: imagePath,
          upvotes: 0,
          downvotes: 0,
        };

        const createNewPost = (await API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as { data: CreatePostMutation };

        console.log("new post created succefully", createNewPost);
        router.push(`/post/${createNewPost.data.createPost.id}`);
      } catch (error) {
        error.log("Error uploading file: ", error);
      }
    } else {
      // Once the upload is uploaded...
      const createNewPostWithoutImageInput: CreatePostInput = {
        title: data.title,
        contents: data.content,
        upvotes: 0,
        downvotes: 0,
      };

      const createNewPostWithoutImage = (await API.graphql({
        query: createPost,
        variables: { input: createNewPostWithoutImageInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: CreatePostMutation };

      router.push(`/post/${createNewPostWithoutImage.data.createPost.id}`);
    }

    // Send a request to upload to S3 bucket
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid container spacing={4} direction="column">
          {/* Title */}
          <Grid item>
            <TextField
              variant="outlined"
              id="title"
              name="title"
              label="Post Title"
              type="text"
              fullWidth
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message : null}
              {...register("title", {
                required: {
                  value: true,
                  message: "Please enter a title.",
                },
                maxLength: {
                  value: 120,
                  message:
                    "Please enter a title that is 120 characters or less.",
                },
              })}
            />
          </Grid>
          {/* Content */}
          <Grid item>
            <TextField
              variant="outlined"
              id="content"
              name="content"
              label="Post Content"
              type="text"
              multiline
              fullWidth
              error={errors.content ? true : false}
              helperText={errors.title ? errors.content.message : null}
              {...register("content", {
                required: {
                  value: true,
                  message: "Please enter something for your post.",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "Please make sure that your content is 1000 characters or less.",
                },
              })}
            />
          </Grid>
          {/* Image */}
          <Grid item>
            <ImageDropzone file={file} setFile={setFile} />
          </Grid>
          {/* Submit */}
          <Grid item>
            <Button variant="contained" type="submit" fullWidth>
              Create Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
