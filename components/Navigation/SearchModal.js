import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function SearchModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        disableTouchRipple
        onClick={handleClickOpen}
        startIcon={<SearchIcon />}
        sx={{
          textTransform: "none",
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        Search games...
      </Button>
      <Dialog maxWidth="lg" fullWidth open={open} onClose={handleClose}>
        <Stack sx={{ p: 3 }}>
          <TextField
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mb: 1 }}>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start" sx={{ mb: 2 }}>
                  <Typography
                    component={"span"}
                    onClick={handleClose}
                    sx={{
                      border: 1,
                      borderRadius: 1,
                      color: "text.main",
                      cursor: "pointer",
                      px: 1,
                    }}
                  >
                    esc
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Dialog>
    </>
  );
}
