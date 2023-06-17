import * as React from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface Props {
  AlertType: AlertColor;
  ShowAlert: boolean;
  AlertMessage: string;
}
const TopAlert: React.FC<Props> = ({
  AlertType,
  ShowAlert,
  AlertMessage,
}: Props): JSX.Element => {
  return (ShowAlert ) ? (
    <Alert severity={AlertType}>
      <AlertTitle>{AlertType}</AlertTitle>
      {AlertMessage} — <strong>check it out!</strong>
    </Alert>
  ) : (
    <></>
  );
};

export default TopAlert;
