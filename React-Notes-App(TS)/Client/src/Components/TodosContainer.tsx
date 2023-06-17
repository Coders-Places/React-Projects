import { AlertColor, Box, Button, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import ContextStore from "../Context/ContextStore";
import { serverResponse, Todo } from "../Types/Model";
import { TodoItem } from "./TodoItem";
import axios from "axios";
import Cookies from "js-cookie";
import SkeletonLoader from "./SkeletonLoader";
import { useNavigate } from "react-router-dom";
// * Calling From [App.tsx]
interface Props { }

const TodosContainer: React.FC<Props> = ({ }): JSX.Element => {
  const { Todos, setTodos, showAlert } = useContext(ContextStore);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  console.log()
  // setTodos();

  useEffect(() => {
    // if (localStorage.getItem("todos")) {
    //   console.log("todos are here");
    //   setTodos(JSON.parse(localStorage.getItem("todos") ?? ""));
    // } else {
    //   setTodos([]);
    // }

    const fetchNotes = async () => {

      const config = {
        headers: {
          authToken: Cookies.get("authToken")
        }
      };


      const options = {
        name: "Jake Taper",
        email: "taperjake@gmail.com"
      }

      setIsLoading(true)
      try {
        const { data } = await axios.get("http://localhost:80/api/notes/getAllNotes/", config);
        // console.log(data, "DATA")

        const { userAllNotes }: serverResponse = data as serverResponse
        setTodos(userAllNotes as Todo[]);

        // * Showing Alert, By Passing Alert-Properties {{(Message}} and {{Type}}
        showAlert("success" as AlertColor, data.message as string)

        console.log(Todos, "TOUSTS")
      } catch ({ response: { data } }: unknown) {
        console.log("ERROR", data)
        const { message }: serverResponse = data as serverResponse;
        showAlert("error" as AlertColor, message as string)

      }
      // navigate("/")
      setIsLoading(false)
    }
    fetchNotes();
  }, []);

  return (
    <>
      <Typography variant={"body1"} component={"h2"} fontSize={"2rem"}>
        Your Todos
      </Typography>
      <></>
      {IsLoading ?
        <Box component={"div"} style={{ textAlign: "center" }}>
          <CircularProgress color="secondary" thickness={3} disableShrink />
        </Box> :
        Todos.length === 0 && <Typography variant="h3" mt={6} width={"100%"} textAlign={"center"}>
          No Todos, Create One!
        </Typography>}

      <Stack flexDirection={"row"} flexWrap={"wrap"}>
        {(Todos.length > 0) &&
          Todos.map((item: Todo, idx: number) => (
            <TodoItem key={idx} item={item} />
          ))}
      </Stack>
    </>
  );
};

export default TodosContainer;
