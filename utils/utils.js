import { Box } from "@mui/material";
import { defaultTheme, blackPinkTheme, blackGoldTheme } from "@/styles/theme";
import dayjs from "dayjs";

function ThemeAvatar({ primary, secondary }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "1.2rem",
        width: "1.2rem",
        borderRadius: "50%",
        backgroundColor: secondary,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -1,
          left: -2,
          backgroundColor: primary,
          borderRadius: "10rem 0 0 10rem",
          width: "0.65rem",
          height: "1.2rem",
        }}
      ></Box>
    </Box>
  );
}

export function getTheme(themeName) {
  switch (themeName) {
    case "blackPinkTheme":
      return {
        theme: blackPinkTheme,
        avatar: (
          <ThemeAvatar
            primary={blackPinkTheme.palette.primary.main}
            secondary={blackPinkTheme.palette.secondary.main}
          />
        ),
      };
    case "blackGoldTheme":
      return {
        theme: blackGoldTheme,
        avatar: (
          <ThemeAvatar
            primary={blackGoldTheme.palette.primary.main}
            secondary={blackGoldTheme.palette.secondary.main}
          />
        ),
      };
    case "defaultTheme":
    default:
      return {
        theme: defaultTheme,
        avatar: (
          <ThemeAvatar
            primary={defaultTheme.palette.primary.main}
            secondary={defaultTheme.palette.secondary.main}
          />
        ),
      };
  }
}

export function dateFormat(dateStr) {
  const dt = dayjs(dateStr);
  return dt.format("MMM D, YYYY");
}
