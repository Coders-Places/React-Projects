import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";

const Login = () => {
  // const [Email, setEmail] = useState("");
  // const [Password, SetPassword] = useState("");

  const Email = useRef<HTMLInputElement | null >(null),
    Password = useRef<HTMLInputElement | null >(null);

    
  return (
    <Stack
      component={"form"}
      color="#444"
      sx={{
        mt: "4rem",
        border: "solid #ececec  1px",
        borderRadius: 1.2,
        gap: "0.8rem",
        padding: "2rem",
        width: "54%",
        margin: "9rem auto",
        boxShadow: 4,
      }}
    >
      <Typography component={"h1"} fontSize={"1.8rem"}>
        Login
      </Typography>

      <TextField
        ref={Email}
        id="outlined-basic"
        label="Email"
        type={"email"}
        name={"email"}
        variant="outlined"
        color="secondary"
      />
      <TextField
        ref={Password}
        id="outlined-basic"
        label="Password"
        type={"password"}
        name={"password"}
        variant="outlined"
        color="secondary"
      />

      <Button color="secondary" variant="contained">
        Login
      </Button>
      <Button color="secondary">
        <Link to={"/signup"}>Don't Have Account? Create One</Link>
      </Button>
    </Stack>
  );
};

export default Login;
