import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function CategoryTitle({
  title,
  fontSize = "1.5rem",
  href = "#",
}) {
  if (href === "#") {
    return (
      <Typography
        variant="h2"
        fontSize={fontSize}
        fontWeight={"bold"}
        gutterBottom
      >
        {title}
      </Typography>
    );
  }

  return (
    <Link href={href}>
      <Stack
        alignItems={"center"}
        direction={"row"}
        gap={1}
        sx={{
          transition: "color 0.2s",
          "&:hover": {
            color: "primary.light",
            ".hide": {
              display: "block",
            },
          },
        }}
      >
        <Typography
          variant="h2"
          fontSize={fontSize}
          fontWeight={"bold"}
          gutterBottom
        >
          {title}
        </Typography>
        <ArrowRightIcon className="hide" sx={{ display: "none" }} />
      </Stack>
    </Link>
  );
}
