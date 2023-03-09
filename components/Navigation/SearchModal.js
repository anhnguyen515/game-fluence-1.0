import { getGamesListAPI } from "@/apis/game";
import { PAGINATION_LIMIT } from "@/utils/constants";
import { Close } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { toast } from "react-toastify";

export default function SearchModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChangeQuery(event) {
    setQuery(event.target.value);
  }

  React.useEffect(() => {
    let timer;

    if (open && query.length > 0) {
      timer = setTimeout(() => {
        setLoading(true);
        getGamesListAPI({
          page_size: PAGINATION_LIMIT,
          search: query,
        })
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })
          .catch(() => {
            toast.error("Something went wrong");
            setLoading(false);
          });
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [query]);

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
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          What are you looking for?
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Stack px={3}>
          <TextField
            onChange={handleChangeQuery}
            value={query}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mb: 1 }}>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" sx={{ mb: 2 }}>
                  {loading && <CircularProgress size={24} sx={{ mr: 1 }} />}
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack sx={{ overflow: "auto", p: 3 }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Stack>
      </Dialog>
    </>
  );
}
