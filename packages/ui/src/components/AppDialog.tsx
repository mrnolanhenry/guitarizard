import React, { CSSProperties } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton } from "@mui/material";
import { Base16Theme } from "../colors/themes";

export interface IAppDialogState {
  content?: JSX.Element;
  footer?: JSX.Element;
  isOpen: boolean;
  title?: string;
}
interface IAppDialogProps {
  dialogState: IAppDialogState;
  fullScreen: boolean;
  setDialogState: React.Dispatch<React.SetStateAction<IAppDialogState>>;
  theme: Base16Theme;
}

const AppDialog = (props: IAppDialogProps) => {
  const { dialogState, fullScreen, setDialogState, theme } = props;
  const { content, footer, isOpen, title } = dialogState;

  const handleClose = () => {
    setDialogState({ ...dialogState, isOpen: false });
  };

  const style: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base04,
    borderColor: theme.swatch.base03,
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="app-dialog-title"
      aria-describedby="app-dialog-description"
      fullScreen={fullScreen ?? undefined}
    >
      <Grid container alignItems="center" style={style} padding={1}>
        <Grid container item xs={2}></Grid>
        <Grid container item xs={8} justifyContent="center">
          {title ?? <DialogTitle id="app-dialog-title">{title}</DialogTitle>}
        </Grid>
        <Grid container item xs={2} justifyContent="flex-end">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: "secondary",
            }}
          >
            <CloseIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container style={style} padding={1}>
        {content ?? (
          <DialogContent>
            <DialogContentText id="app-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        )}
      </Grid>
      <Grid container style={style} padding={1}>
        {footer ?? <DialogActions>{footer}</DialogActions>}
      </Grid>
    </Dialog>
  );
};

export { AppDialog };
