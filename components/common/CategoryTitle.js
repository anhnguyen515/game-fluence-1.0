import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function CategoryTitle({ title, href }) {
  if (href === "#") {
    return (
      <Typography
        variant="h2"
        fontSize={"1.6rem"}
        fontWeight={600}
        sx={{
          borderLeft: 5,
          borderColor: "primary.main",
          borderStyle: "dashed",
          pl: 2,
        }}
      >
        {title}
      </Typography>
    );
  }

  return (
    <Link href={href}>
      <Typography
        variant="h2"
        fontSize={"1.6rem"}
        fontWeight={600}
        sx={{
          borderLeft: 5,
          borderColor: "primary.main",
          borderStyle: "dashed",
          pl: 2,
        }}
      >
        {title}
      </Typography>
    </Link>
  );
}
