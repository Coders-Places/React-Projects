import { SettingsInputComponent } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, ChangeEventHandler, useContext } from "react";
import ContextStore from "../Context/ContextStore";

// * Props-Types
interface Props {}

// * Called-By-FormDialog.tsx
const DialogBody: React.FC<Props> = ({}): JSX.Element => {
  const {
    Title,
    Desc,
    setTitle,
    setDesc,
    setOpen,
    Open,
    UID,
    SubmitFormModal,
  } = useContext(ContextStore);

  const onchange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // * Destructuring the currentTarget Property
    const {
      currentTarget: { name, value },
    } = e;

    // * Tracking the input-states
    name === "desc" ? setDesc(value) : setTitle(value);
  };
  return (
    <Dialog open={Open} onClose={() => setOpen(false)}>
      {" "}
      {/* 'onClose' the event fires if [We-Click-Outside-Of-The-Targetted-Container] */}
      <DialogTitle>{UID ? "Edit" : "Add"} Your Todo</DialogTitle>
      <Box component={"form"} onSubmit={SubmitFormModal}>
        <DialogContent>
          <TextField
            color="secondary"
            fullWidth={true}
            required={true}
            id="outlined-basic"
            name="title"
            onChange={
              onchange as ChangeEventHandler<
                HTMLInputElement | HTMLTextAreaElement
              >
            }
            value={Title}
            label="Title"
            variant="outlined"
            sx={{ mb: "0.6rem" }}
          />
          <TextField
            color="secondary"
            fullWidth={true}
            required={true}
            value={Desc}
            name="desc"
            onChange={
              onchange as ChangeEventHandler<
                HTMLInputElement | HTMLTextAreaElement
              >
            }
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline={true}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            type="submit"
            color="secondary"
            variant="contained"
          >
            {UID ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DialogBody;
