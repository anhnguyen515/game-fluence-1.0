import { getGamesListAPI } from "@/apis/game";
import { PAGINATION_LIMIT } from "@/utils/constants";
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
import SearchGameCard from "./SearchGameCard";

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
          page_size: PAGINATION_LIMIT,
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
        <Stack gap={2} px={2} pb={2}>
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
          {data && (
            <Typography textAlign={"center"}>
              <b>{data.count.toLocaleString()}</b>{" "}
              {data.count > 1 ? "results" : "result"} found
            </Typography>
          )}
        </Stack>
        <Divider />
        {data && (
          <Box
            pt={2}
            sx={{
              overflow: "auto",
              "::-webkit-scrollbar": {
                width: "0.35rem",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "text.main",
                opacity: 0.5,
                borderRadius: 1,
              },
            }}
          >
            <Box sx={{ px: 2, pb: 2 }}>
              {data.count > 0 ? (
                <>
                  <Stack gap={2}>
                    {data.results.map((item, index) => (
                      <SearchGameCard key={index} item={item} />
                    ))}
                  </Stack>
                </>
              ) : (
                <Typography>No result found</Typography>
              )}
            </Box>
            {data.count > PAGINATION_LIMIT && (
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
