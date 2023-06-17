import { AlertColor, Box, Container, Modal, Typography } from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
import FormDialog from "./Components/FormDialog";
import { serverResponse, Todo } from "./Types/Model";
import TodosContainer from "./Components/TodosContainer";
import { Routes, Route, useNavigate, NavigateFunction, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import TopAlert from "./Components/TopAlert";
import ContextStore from "./Context/ContextStore";
import SignIn from "./pages/SignIn";
import Cookies from "js-cookie"
import Notes from "./pages/Notes";
import axios from "axios";
import { Message } from "@mui/icons-material";
interface alert {
  alertType: AlertColor;
  alertMessage: string;
}

interface contextValues {
  Title: string; // * state
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  Desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  UID: number;
  setUID: React.Dispatch<React.SetStateAction<number | null>>;
  ShowAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  AlertProps: alert | undefined;
  setAlertProps: React.Dispatch<React.SetStateAction<alert | undefined>>;
  IsLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOpen: (uid: number | null) => void;
  SubmitFormModal: (e: React.FormEvent<HTMLInputElement>) => void;

  // * Used To Show The Top-Alert-Component for some time, just give the; {{alertType}} and {{alertMessage}}
  showAlert: (alertType: AlertColor, alertMessage: string) => void;
}

const App: React.FC = (): JSX.Element => {
  let yourName: string = "hey there"; // * variable will only store a 'string' type data
  let yourAge: number = 18; // * Variable will only store an 'number' type data
  let isABigLiar: boolean = false; // * will only store a boolean value

  // * Variable Would Only Used To Store Array-Of-Strings
  let qualities: string[] = [
    "Programmer",
    "Body-Builder",
    "WingChuner",
    "Foot-Baller",
  ];

  // * [Tuple], An Special Type-Variable Will Only Store 3 things; [number, string, boolean]
  let role: [number, string, boolean] = [5, "ueountoae", true]; // * Tuple

  // * This is how we make objects in ts,
  let employee: object; // * This is Only used to store a general-object

  // * Defining The "Object-Properties"
  type Employee = {
    name: string;
    age: number | string; // * It Can Have "string and number" both type
    work?: string[]; // * The Key 'work' is used to store [array-of-strings], But it's [Optional]
    role: [number, string];
  };

  // * employee2 is the Variable, that is only used to store an object...
  // * According To The "Given-Restrictions", Defining In "Employee" With The Help Of 'type' keyword
  let employee2: Employee = {
    name: "Ramu kaka",
    age: 40,
    work: [
      "Product Manager",
      "Product-Designer",
      "Product-Manufacturer-Artist",
    ],
    role: [1, "shankar"],
  };
  employee2 = {
    name: "Shusit",
    age: 18,
    work: ["Big-Data-Anaylist", "Data-Manager"],
    role: [1, "shaddu"],
  };

  // * Array Of The Custome-Object-Type By using 'type' keyword
  let employs: Employee[];

  // * Assigning An [Array-Of-Objects] To The 'employs' Variable According To The Predefined-Types
  employs = [
    {
      name: "ranjeet",
      age: 23,
      work: ["DemoWork1", "Demo-work-2"],
      role: [2, "shoabi"],
    },
    {
      name: "ranjeet",
      age: 23,
      work: ["DemoWork1", "Demo-work-2"],
      role: [2, "shoabi"],
    },
  ];

  /* --------------- Function-Types-In-TS -----------------*/
  // * "write-identifier" is having a function-type
  let write: Function;

  // * "Write-Identifier" is having a custome function-type;
  let Write: (name: string) => never; // * 'never' Returns-Nothing, 'void' Returns-Undefined

  let storeAnyTypeOfData: any; // * Not-Recommended
  let notSureWhatToStore: unknown; // * Recommended
  /* --------------- Function-Types-In-TS -----------------*/




  /*-------------------------------- PROJECT-STARTING -------------------------------------_*/
  /*-------------------------------- PROJECT-STARTING -------------------------------------_*/

  const navigate: NavigateFunction = useNavigate() as NavigateFunction;
  const [Title, setTitle] = useState<string>("");
  const [Desc, setDesc] = useState<string>("");
  const [Open, setOpen] = useState<boolean>(false); // * For Modal-Element
  const [Todos, setTodos] = useState<Todo[]>([]);
  const [UID, setUID] = useState<string | number | null>(null);
  const [ShowAlert, setShowAlert] = useState<boolean>(false);
  const [AlertProps, setAlertProps] = useState<alert | undefined>();

  // * There's Token To Be The User Logged-In
  const [IsLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const addTodo: () => void = function (): void {
    // * Constructing An Object With The Given-Todo
    const todoObj: Todo = {
      // * const uniqueID =()=> Math.floor(Math.random() * Date.now())
      // TODO The Above Way of creating Unique-ID is Better than this, would integerate soon...!
      // _id: Date.now(),
      title: Title,
      description: Desc,
      isDone: false,
    } as Todo;



    (
      async () => {
        // * SEnding Auth-Token Through Headers
        const config: object = {
          headers: {
            authToken: Cookies.get("authToken")
          }
        };

        // * Sending Note(Todo) Data Through "Body-JSON" 
        const options: Todo = todoObj as Todo;

        try {

          // * API-Call For Posting A Note After Verifying The Auth-Token On The Server
          const { data } = await axios.post("http://localhost:80/api/notes/postNote/", options as Todo, config as object);

          // * Success-Response From Server
          const { message }: serverResponse = data as serverResponse;

          // * Showing The Exact Same Response Through <Alert-Component>
          showAlert("success" as AlertColor, message as string)

          // * Updating The Todos-State
          setTodos([...Todos as Todo[], todoObj as Todo]);

        } catch ({ response: { data } }: unknown) {

          // * UnSuccess-Response From Server
          const { message }: serverResponse = data as serverResponse;

          // * Showing The Exact Same Response Through <Alert-Component>
          showAlert("error" as AlertColor, message);
        }

      }
    )();

    // * Appending The {New-Todo} (Object) In The Previous-Todos
    // setTodos([...Todos, todoObj as Todo] as Todo[]);

    // * Updating The "LC"
    // localStorage.setItem(
    //   "todos",
    //   JSON.stringify([...Todos, todoObj as Todo] as Todo[])
    // );
  };


  // * Editing The Current-Targetted-Todo Through API-Call
  const editTodo: (uId: number) => void = function (uId: number): void {

    Todos.forEach(async (todo: Todo) => {
      if ((todo._id === uId) as boolean) {
        todo.title = Title;
        todo.description = Desc;

        console.log(todo)

        const options: Todo = todo as Todo;

        const config = {
          headers: {
            authToken: Cookies.get("authToken")
          }
        }
        try {

          // * API-Call For Posting A Note After Verifying The Auth-Token On The Server
          const { data } = await axios.put("http://localhost:80/api/notes/updateNote/" + todo._id, options as Todo, config as object);

          // * Success-Response From Server
          const { message }: serverResponse = data as serverResponse;

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
    }
    );
    console.log("hey there this", Todos);

    // * Appending The {New-Todo} (Object) In The Previous-Todos
    // setTodos([...Todos] as Todo[]);

    // * Updating The "LC"
    // localStorage.setItem("todos", JSON.stringify([...Todos] as Todo[]));
  };

  // * Event-Type On Submit-Event (form) using as [Edit, Add]
  const SubmitFormModal: (e: React.FormEvent<HTMLInputElement>) => void =
    function (e: React.FormEvent<HTMLInputElement>): void {
      // * Preventing Default Action On-Submitting Form (Reloading)
      e.preventDefault();

      // * ->Validation: SubmitFormModal if and only if it has atleast 6 to 7 chars
      if (Title?.length >= 6 && Desc?.length >= 6) {
        if (UID) {
          editTodo(UID as number); // * Changing the current targetted -todo
        } else {
          addTodo(); // * Adding A New TODO
        }
      }
    };

  // * We Opened THe Modal To "create" or "edit" the Todo?, if edit then we get the 'true' value from the {edit-param}
  const handleClickOpen: (uid: number | null) => void = function (
    uid: number | null
  ): void {
    // * Wether It's opened for "Editing the current todo", or to "add a new todo"

    // * If UId found it means it's edited
    if (uid) {
      // * Updating the state "UID"
      setUID(uid);

      // * Finding and Destructing the title and description properties from the array-of-todos (state-variable)
      const [{ title, description }] = Todos.filter(
        (todo: Todo) => todo._id === uid
      );

      // * Updating the Input-States
      setTitle(title as string);
      setDesc(description as string);
    } else {
      // * If Uid not found set the 'null'
      setUID(null);
      setTitle("");
      setDesc("");
    }

    // * Opening Modal
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const showAlert: (
    alertType: AlertColor | undefined,
    alertMessage: string
  ) => void = function (
    alertType: AlertColor | undefined,
    alertMessage: string
  ): void {
      setShowAlert(true);

      setAlertProps({
        alertType: alertType as AlertColor,
        alertMessage: alertMessage as string,
      });

      setTimeout(() => {
        setShowAlert(false);
      }, 2500);
    };

  useEffect(() => {

    console.log("ccoco", Cookies.get())
    // showAlert("error", "simple alert Message");
  }, []);

  return (
    <>
      <ContextStore.Provider
        value={
          {
            Title: Title as string,
            setTitle: setTitle as React.Dispatch<React.SetStateAction<string>>,
            Desc: Desc as string,
            setDesc: setDesc as React.Dispatch<React.SetStateAction<string>>,
            Open: Open as boolean,
            setOpen: setOpen as React.Dispatch<React.SetStateAction<boolean>>,
            Todos: Todos as Todo[],
            setTodos: setTodos as React.Dispatch<React.SetStateAction<Todo[]>>,
            UID: UID as number,
            setUID: setUID as React.Dispatch<
              React.SetStateAction<number | null>
            >,
            ShowAlert: ShowAlert as boolean,
            setShowAlert: setShowAlert as React.Dispatch<
              React.SetStateAction<boolean>
            >,
            AlertProps: AlertProps as alert | undefined,
            setAlertProps: setAlertProps as React.Dispatch<
              React.SetStateAction<alert | undefined>
            >,
            IsLoggedIn: IsLoggedIn as boolean,
            setIsLoggedIn: setIsLoggedIn as React.Dispatch<React.SetStateAction<boolean>>,
            handleClickOpen: handleClickOpen as (uid: number | null) => void,

            SubmitFormModal: SubmitFormModal as (
              e: React.FormEvent<HTMLInputElement>
            ) => void,

            // * Used To Show The Top-Alert-Component for some time, Just give the {{alertType}} and {{alertMessage}}
            showAlert: showAlert as (
              alertType: AlertColor,
              alertMessage: string
            ) => void,

          } as contextValues
        }
      >
        <Box sx={{ height: "5rem", width: "100%" }}>
          <TopAlert
            AlertType={AlertProps?.alertType as AlertColor}
            AlertMessage={AlertProps?.alertMessage as string}
            ShowAlert={ShowAlert as boolean}
          />
        </Box>
        <Container maxWidth="lg">
          <Routes>
            {/* <Route path="/login" element={(<Login />)  } /> */}
            <Route index element={(<h1> Index Route</h1>) as JSX.Element} />
            <Route path="/signup" element={<SignUp /> as JSX.Element} />
            <Route path="/signIn" element={(<SignIn />) as JSX.Element} />

            <Route
              path="/notes"
              element={
                (<Notes />)
              }
            />
            <Route path="*" element={<h1>Not Found (404)</h1>} />
          </Routes>
        </Container>
      </ContextStore.Provider>
    </>
  );
};

export default App;
