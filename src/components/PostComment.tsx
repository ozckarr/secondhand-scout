import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { Comment } from "../API";
import formatDatePosted from "../lib/formatDatePosted";

type Props = {
  comment: Comment;
};

export default function PostComment({ comment }: Props) {
  return (
    <Paper
      style={{ width: "100%", minHeight: 128, padding: 16, marginTop: 32 }}
      elevation={1}
    >
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="body1">
            <b>{comment.owner}</b> - {formatDatePosted(comment.createdAt)}h ago
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{comment.content}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
