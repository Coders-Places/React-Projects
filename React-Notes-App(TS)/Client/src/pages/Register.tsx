import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { FormEvent, useRef } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import TopAlert from "../Components/TopAlert";
const Register = () => {
  const Name = useRef<HTMLInputElement | null>(null),
    Email = useRef<HTMLInputElement | null>(null),
    Password = useRef<HTMLInputElement | null>(null);

  const Submit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("first");
    try {
      const { data } = await axios.post(
        "http://localhost:80/api/notes/getAllNotes/",
        {
          headers: {
            // authToken:
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdXNlcklkIjoiNjNhYzY2ZGE3NzkxMDdlMWU5YmU0MDc4IiwiZW1haWwiOiJoczU5MjQ0MTRAZ21haWwuY29tIiwiaWF0IjoxNjcyNDMzNjMxfQ.owD3a7rcRLu7Ha7ybtAfFLRj30cmW_YiE9w5fgIJTSE",
          },
          body: {
            name: "Ramu Kaka",
            email: "mrw58901878@gmail.com",
            password: "#includes",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      
      <Stack
        component={"form"}
        color="#444"
        sx={{
          mt: "4rem",
          border: "solid #ececec  1px",
          borderRadius: 1.2,
          gap: "1rem",
          padding: "2rem",
          width: "54%",
          margin: "9rem auto",
        }}
      >
        <Typography component={"h1"} fontSize={"1.8rem"}>
          Register
        </Typography>
        <TextField
          ref={Name}
          id="outlined-basic"
          label="Your Name"
          type={"text"}
          name={"name"}
          variant="outlined"
          color="secondary"
        />
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

        <Button
          sx={{ width: "9rem", pt: "9px" }}
          color="secondary"
          variant="contained"
          onClick={Submit}
        >
          Register
        </Button>

        <Button color="secondary">
          <Link to={"/login"}>Already Have Account?</Link>
        </Button>
      </Stack>
    </>
  );
};

export default Register;
