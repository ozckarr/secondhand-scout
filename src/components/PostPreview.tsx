import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Post } from "../API";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
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
        <Grid item style={{ maxWidth: 128 }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <ArrowUpwardIcon />
              </IconButton>
            </Grid>
            <Grid item>votes</Grid>
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
                Posted by <b>{post.owner}</b> at <b>{post.createdAt}</b>
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h2">{post.title}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
