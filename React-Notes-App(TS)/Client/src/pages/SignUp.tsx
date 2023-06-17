import * as React from "react";
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
import axios from "axios";
import ContextStore from "../Context/ContextStore";
import { postUserBodyField, serverResponse } from "../Types/Model";

import Cookies from 'js-cookie'
import { AlertColor } from "@mui/material";

// Cookies.set('name', 'value', { expires: 7, path: '' })
// Cookies.get('name') // => 'value'
// Cookies.get() // => { name: 'value' }
// Cookies.remove('name', { path: '' }) // removed!


interface Props { }

interface postUserSignupBody {
  name: postUserBodyField;
  email: postUserBodyField;
  password: postUserBodyField;
}
function check(email: postUserBodyField, password: postUserBodyField, name: postUserBodyField) {
  console.log
  const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ as RegExp;
  if (name.length >= 8 && password.length >= 8) {
    if (emailRegex.test(email)) {
      return true;
    }
  }
  return false;
}
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="#" color="inherit">
        HamzaJawaidShaikh.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUp: React.FC<Props> = ({ }: Props): JSX.Element => {
  const { showAlert, setIsLoggedIn, IsLoggedIn } = React.useContext(ContextStore);  // * Centeral-Data (Store)
  const navigate = useNavigate();
  const [IsChecked, setIsChecked] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // * Preventing From The Default behaviour of the form-submition
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // * It's Sent As Post-Method
    const options: postUserSignupBody = {
      email: formData.get("email") as postUserBodyField,
      password: formData.get("password") as postUserBodyField,
      name: formData.get("username") as postUserBodyField,
    } as postUserSignupBody;

    // * Validating Email, Username, and Password
    const args: postUserBodyField[] = Object.values(options) as postUserBodyField[];

    // * Using Tuple To Pass Arguments With Spread-Operator
    if (!check(...args as [postUserBodyField, postUserBodyField, postUserBodyField])) {

      // console.log(Cookies.get("authToken"))
      console.log(IsLoggedIn, "LOOOOTOK",)
      showAlert("error", "All Fields Are Required :("); // * Showing Alert After Server's Response
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:80/api/auth/signup",
        options
      );

      // * Success Message From Server
      const { message }: serverResponse = data as serverResponse;

      // * Storing Auth-Token (from Server as Response) Through Cookies
      Cookies.set("authToken", data.Token as string, { expires: 7, path: '' });


      // * Showing Alert After Server's "Successful Response"
      showAlert("success", message as string);

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
      setIsLoggedIn(true);
      navigate("/notes");
    } else {
      setIsLoggedIn(false)
    }
  }, []);

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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    color={"secondary"}
                    autoFocus
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  color={"secondary"}
                  autoComplete="family-name"
                />
              </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    color={"secondary"}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    color={"secondary"}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    onChange={() => setIsChecked(!IsChecked) }

                    control={
                      <Checkbox defaultChecked={false} checked={IsChecked} value="allowExtraEmails" color="secondary" />
                    }
                    label="Show Password"
                  />
                </Grid>
              </Grid>
              <Button
                color={"secondary"}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signin" color={"secondary"}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider> : <></>
  );
};

export default SignUp;
