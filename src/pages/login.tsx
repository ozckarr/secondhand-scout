import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Grid, Snackbar, TextField } from "@material-ui/core";
import { Auth } from "aws-amplify";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { useUser } from "../context/AuthContext";
import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";

interface IFormInput {
  username: string;
  password: string;
}

export default function LogIn() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [signInError, setSignInError] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const amplifyUser = await Auth.signIn(data.username, data.password);
    if (amplifyUser) {
      router.push("/");
    } else {
      throw new Error("Something went wrong");
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item style={{ marginTop: "1em" }}>
          <TextField
            variant="outlined"
            id="username"
            name="username"
            label="Username"
            type="text"
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : null}
            {...register("username", {
              required: {
                value: true,
                message: "Please enter a username.",
              },
              minLength: {
                value: 3,
                message: "Please enter a username between 3-16 characters.",
              },
              maxLength: {
                value: 16,
                message: "Please enter a username between 3-16 characters.",
              },
            })}
          />
        </Grid>

        <Grid item>
          {/*TODO: Add password rules*/}
          <TextField
            variant="outlined"
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              required: {
                value: true,
                message: "Please enter a password.",
              },
              minLength: {
                value: 8,
                message: "Please enter a password with at least 8 characters.",
              },
            })}
          />
        </Grid>

        <Grid item>
          <Button variant="contained" type="submit">
            Log in
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {signInError}
        </Alert>
      </Snackbar>
    </form>
  );
}
