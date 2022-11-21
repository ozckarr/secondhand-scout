import React, { ReactElement, useState } from "react";

import { Button, Container, Grid, TextField } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import ImageDropzone from "../components/ImageDropZone";

interface IFormInput {
  title: string;
  content: string;
  image?: string;
}

interface Props {}

export default function Create({}: Props): ReactElement {
  const [file, setFile] = useState<File>();
  console.log(file);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
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
            <Button variant="contained" fullWidth>
              Create Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
