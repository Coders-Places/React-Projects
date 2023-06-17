import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContextStore from "../Context/ContextStore";

import Cookies from "js-cookie";
import { postUserBodyField, serverResponse } from "../Types/Model";
import axios from "axios";
import { AlertColor } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="#">
        HamzaJawaidShaikh.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
interface Props { }
export default function SignIn<Props>({ }: Props): JSX.Element {

  const { setIsLoggedIn, IsLoggedIn, showAlert } = useContext(ContextStore);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // console.log({
    //   email: formData.get("email") ,
    //   password: formData.get("password"),
    // });

    // TODO, Gotta Validate The Inputs From (User)
    const options = {
      email: formData.get("email") as postUserBodyField,
      password: formData.get("password") as postUserBodyField,
    }

    try {

      const { data } = await axios.post(
        "http://localhost:80/api/auth/login",
        options
      );

      const { message }: serverResponse = data as serverResponse;

      // * Storing Auth-Token (from Server as Response) Through Cookies
      Cookies.set("authToken", data.Token as string, { expires: 7, path: '' });

      // * Showing Alert After Server's "Successful Response"
      showAlert("success" as AlertColor, message as string)

      setTimeout(() => {
        setIsLoggedIn(true);
        navigate("/notes")
      }, 1000);

    } catch ({ response: { data } }: unknown) {
      // * UnSuccess Message From Server
      const { message }: serverResponse = data as serverResponse;

      // * Showing Alert After Server's "Un-Successful Response"
      showAlert("error" as AlertColor, message as string)
    }



  };

  React.useEffect(() => {
    if (Cookies.get("authToken")) {
      setIsLoggedIn(true);  // * By Default It's False, if cookies set it to true
      navigate("/notes");
    } else {
      setIsLoggedIn(false);
    }
  });
  return (
    (!IsLoggedIn) ?
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="secondary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link color={"secondary"} to="#">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" color={"secondary"}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider> : <></>
  );
}
