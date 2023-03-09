import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Searchbar({ q = "" }) {
  const router = useRouter();
  const [query, setQuery] = React.useState(q);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let timer;
    if (query !== q) {
      setLoading(true);
      timer = setTimeout(() => {
        router.push({
          pathname: "/search",
          query: {
            q: query,
          },
        });
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [query]);

  React.useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        setLoading(false);
      });
    };
  }, []);

  return (
    <TextField
      fullWidth
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Keywords here"
      sx={{ mb: 3 }}
      value={query}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {loading && <CircularProgress size={24} />}
          </InputAdornment>
        ),
      }}
    />
  );
}
