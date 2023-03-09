import { getGamesListAPI } from "@/apis/game";
import { Close } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
import SmallGameCard from "../Game/SmallGameCard";

export default function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [data, setData] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChangeQuery(event) {
    setQ(event.target.value);
  }

  React.useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      handleClose();
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        handleClose();
      });
    };
  }, []);

  React.useEffect(() => {
    let timer;
    if (open && q.length > 0) {
      timer = setTimeout(() => {
        setLoading(true);
        getGamesListAPI({
          page_size: 10,
          search: q,
          search_precise: true,
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
  }, [q]);

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
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
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
        <Stack px={3} pb={3}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push({
                pathname: "/search",
                query: {
                  q,
                },
              });
            }}
          >
            <TextField
              fullWidth
              onChange={handleChangeQuery}
              placeholder="Keywords here"
              value={q}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {loading && <CircularProgress size={24} />}
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Stack>
        {data && (
          <Box sx={{ overflow: "auto" }}>
            <Box sx={{ px: 3, pb: 3 }}>
              {data.count > 0 ? (
                <>
                  <Typography textAlign={"center"}>
                    <b>{data.count.toLocaleString()}</b>{" "}
                    {data.count > 1 ? "results" : "result"} found
                  </Typography>
                  <Stack divider={<Divider flexItem />} gap={2} mt={3}>
                    {data.results.map((item, index) => (
                      <SmallGameCard key={index} item={item} />
                    ))}
                  </Stack>
                </>
              ) : (
                <Typography>No result found</Typography>
              )}
            </Box>
            {data.count > 10 && (
              <Button
                fullWidth
                onClick={() => {
                  router.push({
                    pathname: "/search",
                    query: {
                      q,
                    },
                  });
                }}
              >
                See all results
              </Button>
            )}
          </Box>
        )}
      </Dialog>
    </>
  );
}
