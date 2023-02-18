import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export default function FullScreenLoader() {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <CircularProgress color="primary" size={64} />
    </Stack>
  );
}
