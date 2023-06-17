import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { serverResponse, Todo } from "../Types/Model";
import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ContextStore from "../Context/ContextStore";
import { AlertColor } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie"
// * Calling From [TodosContainer.tsx]

interface Props {
  item: Todo;
}
export const TodoItem: React.FC<Props> = ({ item }): JSX.Element => {
  // let hamza: string = "hamza shauhe";
  // let h = hamza as string; // * Compiler will assume it as string variable
  const { handleClickOpen, Todos, showAlert, setTodos } = React.useContext(ContextStore);
  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "45%", md: "31%", lg: "31%" },
        boxShadow: 3,
        m: 1,
        p: 1,
        borderRadius: 3,
        // bgcolor: { xs: "blue", sm: "red", md: "yellow", lg: "green" },
      }}
    >
      <CardContent>
        <Typography
          sx={{ wordWrap: "anywhere" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {item.title}
        </Typography>
        <Typography
          sx={{ wordWrap: "anywhere" }}
          variant="body2"
          color="text.secondary"
        >
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {

            // * FINDING THE TARGET-TODO AND THE REMOVING IT FROM ARRAY WITH ".splice" method
            Todos.forEach(async (todo: Todo, index: number  ) => {
              if (todo._id === item._id) {

                const options: Todo = todo as Todo;

                const config: object = {
                  headers: {
                    authToken: Cookies.get("authToken")
                  }
                }

                console.log(item, todo)
                try {

                  // * API-Call For Posting A Note After Verifying The Auth-Token On The Server
                  const { data } = await axios.delete("http://localhost:80/api/notes/deleteNote/" + todo._id, config as object);

                  // * Success-Response From Server
                  const { message }: serverResponse = data as serverResponse;

                  // * Removing An Element From The Todos-Array-Of-Objects
                  Todos.splice(index, 1);

                  // * Showing The Exact Same Response Through <Alert-Component>
                  showAlert("success" as AlertColor, message as string)


                  // * Updating The Todos-State
                  setTodos([...Todos as Todo[]]);

                } catch ({ response: { data } }: unknown) {

                  // * UnSuccess-Response From Server
                  const { message }: serverResponse = data as serverResponse;

                  // * Showing The Exact Same Response Through <Alert-Component>
                  showAlert("error" as AlertColor, message);
                }

              }
            });


            // * After removing, we are updating the todos state
            setTodos([...Todos]);
          }}
          size="small"
          variant="contained"
          color="secondary"
        >
          {/* <DeleteOutlineTwoToneIcon /> */}
          Done
        </Button>
        <Button
          onClick={() => {



            // * Destructring an Object From Array-Of-Objects  and then, again destructing "_id" a Property From The {Destructured-Object}
            const [{ _id }]: Todo[] = Todos.filter(
              (todo: Todo) => todo._id === item._id
            );


            // * Passing the uid as parameters In the handleClickOpen (modal-Open-State-manage-function)
            handleClickOpen(_id as string);
          }}
          size="small"
          variant="contained"
          color="secondary"
        >
          < EditIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
