import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function CategoryTitle({ title, href }) {
  if (href === "#") {
    return (
      <Typography variant="h2" fontSize={"1.8rem"} fontWeight={"bold"}>
        {title}
      </Typography>
    );
  }

  return (
    <Link href={href}>
      <Typography
        variant="h2"
        fontSize={"1.8rem"}
        fontWeight={"bold"}
        sx={{
          transition: "color 0.2s",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        {title}
      </Typography>
    </Link>
  );
}
