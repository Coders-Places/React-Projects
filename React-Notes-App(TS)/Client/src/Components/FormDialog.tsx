import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Add from "@mui/icons-material/Add";
import { Box, Stack } from "@mui/system";
import { Paper } from "@mui/material";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import DialogBody from "./DialogBody";
import { Todo } from "../Types/Model";

import ContextStore from "../Context/ContextStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
interface Props { }
const FormDialog: React.FC<Props> = ({ }: Props): JSX.Element => {
  const { handleClickOpen, showAlert } = React.useContext(ContextStore);
  const navigate = useNavigate ();

  return (
    <>
      <Button sx={{display: "flex", ml: "auto", width: "8rem", justifyContent: "space-between"}} variant={"outlined"} color={"secondary"} onClick={() => {
        showAlert("success", "Successfully Loggedout!")
        navigate("/signup");
        Cookies.remove("authToken")
        
      }}>
        <Box component={"span"} mt="0.16rem"> Logout </Box>
        <LogoutTwoToneIcon />
      </Button>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: "0.8rem", mt: 2 }}

          // * 'null' Means We're Opening The 'Modal' For Adding A [New Note], There's No ["Todo-Item-Id" To Edit]
          onClick={() => handleClickOpen(null)}
        >
          <Add sx={{ fontSize: "4rem" }} />
        </Button>

        {/* * Modal-Screen(PoppUp-Content)  */}
        <DialogBody />
      </Stack>
    </>
  );
};

export default FormDialog;
