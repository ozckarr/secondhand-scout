import {
  Box,
  ButtonBase,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { Post } from "../API";
import Image from "next/image";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useRouter } from "next/router";
import formatDatePosted from "../lib/formatDatePosted";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const router = useRouter();

  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
        spacing={3}
        style={{ padding: 12, marginTop: 24 }}
      >
        {/* Upvote / votes / downvote */}
        <Grid item style={{ maxWidth: 128 }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <ArrowUpwardIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <Typography variant="h6">
                    {post.upvotes - post.downvotes}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">votes</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton color="inherit">
                <ArrowDownwardIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Content Preview */}
        <Grid item>
          <ButtonBase onClick={() => router.push(`/post/${post.id}`)}>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item>
                <Typography variant="body1">
                  Posted by <b>{post.owner}</b>{" "}
                  {formatDatePosted(post.createdAt)} hours ago
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h2">{post.title}</Typography>
              </Grid>
              <Grid
                item
                style={{
                  maxHeight: 32,
                  overflowY: "hidden",
                  overflowX: "hidden",
                }}
              >
                <Typography variant="body1">{post.contents}</Typography>
              </Grid>
              {post.image && (
                <Grid item>
                  <Image
                    src={`https://source.unsplash.com/random/980x540`}
                    width={980}
                    height={540}
                    layout="intrinsic"
                  />
                </Grid>
              )}
            </Grid>
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  );
}
