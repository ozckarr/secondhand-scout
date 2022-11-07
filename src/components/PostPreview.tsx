import { Box, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Post } from "../API";
import Image from "next/image";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const convertDateToElapsedDate = (date: string): string => {
    //Create handling of "hour ago" > "days ago" > "date"
    const now = new Date(Date.now());
    const current = new Date(date);

    const diff = now.getTime() - current.getTime();
    return (diff / 1000 / 60 / 60).toFixed(0);
  };

  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
        style={{ width: "100%", margin: "6px 0 0 0" }}
      >
        <Grid item style={{ maxWidth: "70%" }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <ArrowUpwardIcon />
              </IconButton>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <Grid item>
                <Typography variant="h6">
                  {(post.upvotes - post.downvotes).toString()}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">votes</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton color="inherit">
                <ArrowDownwardIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="flex-start">
            <Grid item>
              <Typography variant="body1">
                Posted by <b>{post.owner}</b>{" "}
                {convertDateToElapsedDate(post.createdAt)} hour ago
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h2">{post.title}</Typography>
            </Grid>
            <Grid
              item
              style={{
                maxHeight: 96,
                overflowY: "hidden",
                overflowX: "hidden",
              }}
            >
              <Typography variant="body1">{post.contents}</Typography>
            </Grid>
            {post.image && (
              <Grid>
                <Image
                  src={`https://source.unsplash.com/random`}
                  width={200}
                  height={200}
                  layout="intrinsic"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
